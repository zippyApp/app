import { Injectable, inject } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private directionsApi:DirectionsApiClient = inject(DirectionsApiClient);

  private map?:Map;
  private markers:Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  constructor() { }

  setMap(map:Map){
    this.map = map;
  }

  flyTo(coords:LngLatLike){
    if(!this.isMapReady)throw new Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(stations:any[], currentLocation:[number,number]){
    if(!this.map) throw Error('No hay mapa');

    this.markers.forEach(marker => marker.remove());
    const newMarkers:any[] = [];
    stations.forEach(station => {
      const [lng, lat] = station.cords;

      const popup = new Popup()
        .setHTML(
          `<h6>${station.nombre}</h6>
          <span>${station.direccion}</span>
          `
        );
        const newMarker = new Marker({color:'red'})
          .setLngLat([lng, lat])
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

  getRouteBetweenPoints(start:[number, number], end:[number,number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]));

  }

  private drawPolyline(route:Route){
    console.log(route.distance, route.duration );

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
}
