import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { provideHttpClient, withFetch } from '@angular/common/http';

Mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vic3RpaWFuIiwiYSI6ImNsdTl5eGV0NzBlaGsycXBubDlrd2xoZjIifQ.3cUWTjnCSnAmVUW--A9NDA';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ],
});
