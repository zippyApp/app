import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MapViewComponent } from 'src/app/components/map-view/map-view.component';
import { ZippyLogoComponent } from 'src/app/components/zippy-logo/zippy-logo.component';
import { addIcons } from 'ionicons';
import { IonModal } from '@ionic/angular';
import {
  locateOutline,
  bicycle,
  swapVerticalOutline
} from 'ionicons/icons'
import { MapService } from 'src/app/services/map.service';
import { SearchBarResultsComponent } from 'src/app/components/search-bar-results/search-bar-results.component';
import { HttpClientModule } from '@angular/common/http';
import { Stage, Station } from 'src/app/interfaces/station';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LoadingComponent,MapViewComponent,ZippyLogoComponent,SearchBarResultsComponent,HttpClientModule],
  providers:[HttpClientModule]
})
export class MapPage  {
  @ViewChild('modal') modal?:IonModal;

  private placesServices:PlacesService = inject(PlacesService);
  private mapService:MapService = inject(MapService);
  private formBuilder:FormBuilder = inject(FormBuilder);


  get stage(){
    return this.mapService.stage;
  }

  get distance(){
    return this.mapService.distance;
  }

  get duration(){
    return this.mapService.duration;
  }

  get originStation(){
    return this.mapService.originStation;
  }

  get destinationStation(){
    return this.mapService.destinationStation;
  }

  form?:FormGroup;

  @ViewChild('select') select?:any;


  constructor() {
    addIcons({ locateOutline,bicycle,swapVerticalOutline });
   }

   async ngOnInit(){
    this.form = this.formBuilder.group({
      station:['']
    })
    await this.placesServices.printCurrentPosition();
    this.placesServices.getStations()


   }
   ionViewWillEnter(){
   }

   ngAfterViewInit(){


    // if(!this.placesServices.isUserLocationReady) throw Error('No hay ubicación del usuario');
    // this.mapService.createMarkersFromPlaces(this.stations, this.placesServices.userLocation!);
   }

  changeStation(stage:Stage){
    this.modal?.present();
    this.mapService.setStage(stage);
  }


  get isUserLocationReady(){
    return this.placesServices.isUserLocationReady;
  }

  goToMyLocation(){

    if(!this.placesServices.isUserLocationReady) throw Error('No hay ubicación del usuario');
    if(!this.mapService.isMapReady) throw Error('No hay mapa');

    this.mapService.flyTo(this.placesServices.userLocation!);
  }




  closeModal(close:boolean){
    if(close) this.modal?.dismiss();

  }

  swapStations(){
    const aux = this.destinationStation;
    if(this.originStation == null || this.destinationStation == null)return;
    this.mapService.setDestinationStation(this.originStation!);
    this.mapService.setOriginStation(aux!);

  }



}
