import { Geolocation } from '@capacitor/geolocation';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Station } from '../interfaces/station';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http:HttpClient = inject(HttpClient);

  public userLocation?: [number, number];
  public isLoadingStations: boolean = false;
  public stations: Station[] = [];

  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor() {
    this.printCurrentPosition();
    this.getStations();
  }

  public async printCurrentPosition(){
    const{latitude,longitude}= (await Geolocation.getCurrentPosition()).coords;
    this.userLocation = [longitude,latitude];
    return this.userLocation;

  }

  public getStations(){
    this.isLoadingStations = true;
    return this.http.get<Station[]>(environment.backStations+'getEstacionesAbiertasMapa',{
      // headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*")
    })
      .subscribe(
        stations =>{
          this.stations = stations;
          this.isLoadingStations = false;
        }
      )


  }

}
