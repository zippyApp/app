import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../services/api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { Stage, Station } from '../interfaces/station';
import { ActionSheetController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlacesService } from './places.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private directionsApi:DirectionsApiClient = inject(DirectionsApiClient);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  stage: Stage = Stage.DESTINO;

  originStation?:Station | null;
  destinationStation?:Station | null;

  private map?:Map;
  private markers:Marker[] = [];

   stageObservable: BehaviorSubject<Stage> = new BehaviorSubject<Stage>(this.stage);


  originDistance?:number;
  destinationDistance?:number;
  originDuration?:number;
  destinationDuration?:number;
  get isMapReady(){
    return !!this.map;
  }

  constructor() { }

  setMap(map:Map){
    this.map = map;
  }

  setFitBounds(padding:number, currenLocation :[number,number]){
    if(this.map === undefined) throw new Error('No hay mapa');

    const bounds = new LngLatBounds();
    this.markers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(currenLocation);

    this.map.fitBounds(bounds,{
      padding:padding
    })
  }

  setStage(stage:Stage){
    this.stageObservable.next(stage);
    this.stage = stage;
  }
  setOriginStation(station:Station){
    this.originStation = station;
  }
  setDestinationStation(station:Station){
    this.destinationStation = station;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady)throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 18,
      center: coords
    })
  }

  createMarkersFromPlaces(stations:Station[], currentLocation:[number,number]){
    if(!this.map) throw Error('No hay mapa');

    this.markers.forEach(marker => marker.remove());
    const newMarkers:any[] = [];

    if (stations.length === 0) return;

    stations.forEach(station => {

      const coords = [station.longitude, station.latitude] as [number, number];
      const popup = new Popup({ closeButton: true, closeOnClick: true, closeOnMove: true})
        .setHTML(
          `<div style='text-align:center; padding:0px;'>
            <h6 style="color: black; margin-top: 0; margin-bottom:0"><strong>${station.stationName}</strong></h6>
            <span style="color: black;">${station.stationAddress}</span>
          </div>
          `
        ).on('open',async()=>{
          if(!(this.stage === Stage.ORIGEN || this.stage === Stage.DESTINO || this.stage === Stage.CAMBIO_DESTINO || this.stage === Stage.CAMBIO_ORIGEN)) return;
          const confirm = await this.confirmStation(station);
          if(confirm){
            if(this.stage === Stage.DESTINO){
              this.destinationStation = station;
              this.setStage(Stage.ORIGEN);
            }
            else if(this.stage === Stage.ORIGEN){
              if (this.destinationStation?.id == station.id) {
                this.destinationStation = null;
              };
              this.originStation = station;
              this.setStage(Stage.CONFIRMACION);
            }
            else if(this.stage === Stage.CAMBIO_DESTINO){
              if(this.originStation?.id == station.id) {
                this.originStation = null;
              };
              this.destinationStation = station;
              this.setStage(Stage.CONFIRMACION);
            }
            else if(this.stage === Stage.CAMBIO_ORIGEN){
              if(this.destinationStation?.id == station.id) {
                this.destinationStation = null;
              };
              this.originStation = station;
              this.setStage(Stage.CONFIRMACION);
            }

          }
        // this.getDirections(station,currentLocation);
      });
      const newMarker = new Marker({color:'red'})
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(this.map!);
      newMarkers.push(newMarker);
    });

    this.markers = newMarkers;

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(currentLocation);

    this.map.fitBounds(bounds,{
      padding:{
        top: 200,
        bottom: 200,
        left: 120,
        right: 120
      }

    })
  }

  //Para que elimine los markers excepto los que corresponden a la stacion de origen y destino seleccionadas
  deleteMarkersDifferentsToOriginAndDestination() {

    const originCoordinates = [this.originStation!.longitude, this.originStation!.latitude];
    const destinationCoordinates = [this.destinationStation!.longitude, this.destinationStation!.latitude];

    this.markers.forEach(marker => {
      const coords = marker.getLngLat();
      if(coords.lng !== originCoordinates[0] && coords.lat !== originCoordinates[1] &&
        coords.lng !== destinationCoordinates[0] && coords.lat !== destinationCoordinates[1]){
          marker.remove();
        };
    });

  }

  async getRouteToOrgin(userCoordinates: [number, number], originStationId: number, color: string, routeName: string, currentLocation: [number, number]) {
    return new Promise<void>((resolve, reject) => {
      this.directionsApi.get<DirectionsResponse>(`toOrigin/${userCoordinates.join(',')}/${originStationId}`)
        .subscribe(
          resp => {
            this.drawPolyline(resp.routes[0], color, routeName, currentLocation);
            resolve(); // Resuelve la promesa cuando la operación asíncrona se completa con éxito
          },
          error => {
            reject(error); // Rechaza la promesa si ocurre un error
          }
        );
    });
  }

  async getRouteToDestination(originStationId: number, destinationStationId: number, color: string, routeName: string, currentLocation: [number, number]) {
    return new Promise<void>((resolve, reject) => {
      this.directionsApi.get<DirectionsResponse>('toDestination/' + `${originStationId}/${destinationStationId}`)
        .subscribe(
          resp => {
            this.drawPolyline(resp.routes[0], color, routeName, currentLocation);
            resolve(); // Resuelve la promesa cuando la operación asíncrona se completa con éxito
          },
          error => {
            reject(error); // Rechaza la promesa si ocurre un error
          }
        );
    });
  }

  private drawPolyline(route:Route, color:string, routeName:string, currentLocation:[number,number]){

    let distance = (Math.round((route.distance / 10)) / 100);
    let duration = Math.floor(route.duration / 60);
    if(routeName == 'RouteOrigin'){
      this.originDistance=distance;
      this.originDuration=duration;
    }else{
      this.destinationDistance=distance
      this.destinationDuration=duration
    }

    if(!this.map) throw Error('No hay mapa inicializado');
    const coords = route.geometry.coordinates;
    var newBounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      newBounds.extend([lng, lat]);
    });

    newBounds.extend(currentLocation!);

    //Para que los bounds incluyan tanto la ruta de la ubicacion al origen como la del origen al destino

    this.map?.fitBounds( newBounds, {
      padding: {
        top: 200,
        bottom: 120,
        left: 120,
        right: 120
      }
    });


    const RouteData:AnySourceData={
      type: 'geojson',
      data:{
        type: 'FeatureCollection',
        features:[{
          type: 'Feature',
          properties:{},
          geometry:{
            type: 'LineString',
            coordinates: coords
          }
        }],
      }
    }
    //Para que elimine los markers excepto los que corresponden a lestacion de origen y destino seleccionadas
    this.deleteMarkersDifferentsToOriginAndDestination();
    try {
      this.map?.removeImage(routeName+'Box');
    } catch (error) {
      console.log('error')
    }
    //Renderizar ruta
    this.map.addSource(routeName, RouteData);
    this.map.addLayer({
      id:routeName,
      type:'line',
      source:routeName,
      layout:{
        'line-join':'bevel',
        'line-cap':'butt'
      },
      paint:{
        'line-color':color,
        'line-width':3
      }
    })

    //Para añadir etiqueta con la duracion y distancia del viaje:
    const totalLength = coords.length;
    // Encontrar el índice de la coordenada en la mitad -1 del arreglo de coordenadas
    const halfIndex = Math.floor(totalLength / 2)-2;
    // Obtener las coordenadas de la instrucción de la mitad de la ruta
    const midCoordinates = coords[halfIndex];

    const middleRouteCoordinate: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: midCoordinates
          }
        }],
      }
    }

    this.map.addSource(routeName + 'middleCoordinate', middleRouteCoordinate);
    const imageUrl: string = routeName === 'RouteOrigin' ? './assets/etiquetaAzulCaminandoDerecha.png' : './assets/etiquetaRojaCicla.png';

    this.map.loadImage(imageUrl, (error: any, image: any) => {
      if (error) {
        console.error('Error al cargar la imagen:', error);
      } else {
        // Agrega la imagen al estilo con el nombre 'Box'
        if (this.map) {
          this.map.addImage(routeName+'Box', image);
          this.map.addLayer({
            id: routeName + 'TimeDistanceLayer',
            type: 'symbol',
            source: routeName + 'middleCoordinate',
            layout: {
              'icon-allow-overlap':true,
              'icon-ignore-placement':true,
              'icon-image': routeName + 'Box',
              'text-field': ['concat', duration + ' min\n', distance.toFixed(2) + ' kms\n'],
              'text-font': ['Open Sans Regular'],
              'text-size': 12,
              'text-offset': routeName === 'RouteOrigin' ? [4, 0] : [-4, 0],
              'icon-text-fit': 'both',
              'icon-text-fit-padding': routeName === 'RouteOrigin' ? [10, 10, 25, 26]  : [10, 26, 25, 10]
            },
            paint: {
              'text-color': 'black'
            }
          });
        }
      }
    });
  }

  cleanPolylines() {
    
    if (this.map?.getLayer('RouteDestination')) {
      this.map?.removeLayer('RouteDestination');
    }

    if (this.map?.getSource('RouteDestination')) {
      this.map?.removeSource('RouteDestination');
    }

    if (this.map?.getLayer('RouteDestination' + 'TimeDistanceLayer')) {
      this.map?.removeLayer('RouteDestination' + 'TimeDistanceLayer');
    }

    if (this.map?.getSource('RouteDestination' + 'middleCoordinate')) {
      this.map?.removeSource('RouteDestination' + 'middleCoordinate');
    }

    if (this.map?.getLayer('RouteOrigin')) {
      this.map?.removeLayer('RouteOrigin');
    }

    if (this.map?.getSource('RouteOrigin')) {
      this.map?.removeSource('RouteOrigin');
    }

    if (this.map?.getLayer('RouteOrigin' + 'TimeDistanceLayer')) {
      this.map?.removeLayer('RouteOrigin' + 'TimeDistanceLayer');
    }

    if (this.map?.getSource('RouteOrigin' + 'middleCoordinate')) {
      this.map?.removeSource('RouteOrigin' + 'middleCoordinate');
    }

  }

  async confirmStation(station:Station){
    const actionSheet = await this.actionSheetCtrl.create({
      header: `¿Esta seguro que desea elegir la estación ${station.stationName}?`,
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';

  }
}
