import { Geolocation } from '@capacitor/geolocation';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Station } from '../interfaces/station';
import { environment } from 'src/environments/environment';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http: HttpClient = inject(HttpClient);
  private mapService: MapService = inject(MapService);

  public userLocation?: [number, number];
  public isLoadingStations: boolean = false;
  public stations: Station[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
  }

  public async printCurrentPosition() {
    const { latitude, longitude } = (await Geolocation.getCurrentPosition()).coords;
    this.userLocation = [longitude, latitude];
    return this.userLocation;

  }

  public getStations() {


    // if ( !this.userLocation ) throw Error('No hay userLocation');

    this.isLoadingStations = true;
    return this.http.get<Station[]>(environment.backStations + 'getStationsMap/all', {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    })
      .subscribe(
        stations => {
          this.stations = stations;
          this.isLoadingStations = false;
          this.mapService.createMarkersFromPlaces(stations, this.userLocation!)
        }
      )


  }

}
