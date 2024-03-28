import { Geolocation } from '@capacitor/geolocation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor() {
    this.printCurrentPosition();
  }

  public async printCurrentPosition(){
    const{latitude,longitude}= (await Geolocation.getCurrentPosition()).coords;
    this.userLocation = [longitude,latitude];
    return this.userLocation;

  }

  public getStations(){

  }

}
