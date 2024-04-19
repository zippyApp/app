import { HttpClient, HttpContext, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { HttpHeaders } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class placesApiClient extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/';

  constructor(handler:HttpHandler){
    super(handler);
  }

  public override get<T>(url:string,options: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
}

    ){
     url = this.baseUrl + url;

     return super.get<T>(url,{
      params:{
        limit:5,
        language:'es',
        access_token:environment.apiKey,
        ...options.params
      }
     });
  }

}
