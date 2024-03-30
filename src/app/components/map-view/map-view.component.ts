import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild, inject } from '@angular/core';
import {Map, Popup, Marker, NavigationControl, GeolocateControl} from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  standalone: true,
})
export class MapViewComponent  implements AfterViewInit {

  private placesService:PlacesService = inject(PlacesService);
  private mapService:MapService = inject(MapService);

  @ViewChild('mapDiv') mapElement?: ElementRef;


  constructor() {
       }

  ngAfterViewInit(): void {

    if(!this.placesService.userLocation) throw Error('No hay PlacesService.UserLocation');

    const map = new Map({
      container: this.mapElement?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const popup = new Popup()
      .setHTML(
        `
        <h1>Aquí estoy</h1>
        <span>Estoy en este lugar del mundo </span>
        `
        )
        .on('open',()=>{console.log('hola')});

    new Marker({color: 'green'})
        .setLngLat(this.placesService.userLocation)
        .setPopup(popup)
        .addTo(map)
    this.mapService.setMap(map);
    map.addControl(
      new GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
      }),"bottom-left"
    )
  }

}
