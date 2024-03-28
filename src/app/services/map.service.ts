import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

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

  createMarkersFromPlaces(stations:any[]){
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
  }
}
