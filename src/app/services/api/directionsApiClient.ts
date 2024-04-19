import { HttpClient, HttpContext, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class DirectionsApiClient extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox';

  constructor(handler:HttpHandler){
    super(handler);
  }

  public override get<T>(url:string

    ){
     url = this.baseUrl + url;

     return super.get<T>(url,{
      params:{
        alternatives:false,
        geometries:'geojson',
        language:'es',
        overview:'full',
        steps:false,
        access_token:environment.apiKey,
      }
     });
  }

}
