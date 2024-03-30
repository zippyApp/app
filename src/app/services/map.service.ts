import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';
import { Stage, Station } from '../interfaces/station';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private directionsApi:DirectionsApiClient = inject(DirectionsApiClient);
  private actionSheetCtrl: ActionSheetController = inject(ActionSheetController);
  stage:Stage = Stage.DESTINO;

  originStation?:string;
  destinationStation?:string;

  private map?:Map;
  private markers:Marker[] = [];


  distance?:number;
  duration?:number;
  get isMapReady(){
    return !!this.map;
  }

  constructor() { }

  setMap(map:Map){
    this.map = map;
  }

  setStage(stage:Stage){
    this.stage = stage;
  }
  setOriginStation(station:string){
    this.originStation = station;
  }
  setDestinationStation(station:string){
    this.destinationStation = station;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady)throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(stations:Station[], currentLocation:[number,number]){
    if(!this.map) throw Error('No hay mapa');

    this.markers.forEach(marker => marker.remove());
    const newMarkers:any[] = [];
    stations.forEach(station => {

      const coords = [station.longitud, station.latitud] as [number, number];
      const popup = new Popup()
        .setHTML(
          `<h6>${station.nombreEstacion}</h6>
          <span>Cra 27#2</span>
          `
        ).on('open',async()=>{
          if(!(this.stage === Stage.ORIGEN || this.stage === Stage.DESTINO || this.stage === Stage.CAMBIO_DESTINO || this.stage === Stage.CAMBIO_ORIGEN)) return;
          const confirm = await this.confirmStation(station);
          if(confirm){
            if(this.stage === Stage.DESTINO){
              this.destinationStation = station.nombreEstacion;
              this.setStage(Stage.ORIGEN);
            }
            else if(this.stage === Stage.ORIGEN){
              if(this.destinationStation === station.nombreEstacion) return;
              this.originStation = station.nombreEstacion;
              this.setStage(Stage.CONFIRMACION);
            }
            else if(this.stage === Stage.CAMBIO_DESTINO){
              if(this.originStation === station.nombreEstacion) return;
              this.destinationStation = station.nombreEstacion;
              this.setStage(Stage.CONFIRMACION);
            }
            else if(this.stage === Stage.CAMBIO_ORIGEN){
              if(this.destinationStation === station.nombreEstacion) return;
              this.originStation = station.nombreEstacion;
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

    if(stations.length === 0) return;


    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(currentLocation);

    this.map.fitBounds(bounds,{
      padding:50
    })
  }

  private getDirections(station:Station, currenLocation:[number, number]){
    const start = currenLocation;
    const end =  [station.longitud, station.latitud] as [number, number];

    this.getRouteBetweenPoints(start, end);
  }



  getRouteBetweenPoints(start:[number, number], end:[number,number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]));

  }

  private drawPolyline(route:Route){
    this.distance = route.distance/1000;
    this.distance = Math.round(this.distance * 100) / 100;
    this.duration = Math.floor(route.duration/60);


    if(!this.map) throw Error('No hay mapa inicializado');
    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map.fitBounds(bounds,{
      padding:50
    })

    const sourceData:AnySourceData={
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

    if(this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id:'RouteString',
      type:'line',
      source:'RouteString',
      layout:{
        'line-join':'round',
        'line-cap':'round'
      },
      paint:{
        'line-color':'black',
        'line-width':3
      }
    })

  }

  async confirmStation(station:Station){
    const actionSheet = await this.actionSheetCtrl.create({
      header: `¿Esta seguro que desea elegir la estación ${station.nombreEstacion}?`,
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
