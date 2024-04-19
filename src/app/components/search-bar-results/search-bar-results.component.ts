import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton,  IonIcon } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Station } from 'src/app/interfaces/station';
import { MapService } from 'src/app/services/map.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrls: ['./search-bar-results.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule,IonHeader, IonToolbar, IonTitle, IonButton,  IonIcon, CommonModule],
  providers:[HttpClientModule]
})
export class SearchBarResultsComponent  implements OnInit {

  @Input() isModal: boolean = false;
  
  @Output() selected:EventEmitter<boolean> = new EventEmitter<boolean>();

    private mapService:MapService = inject(MapService);
    private placesService:PlacesService = inject(PlacesService);

  get stations(){
    return this.placesService.stations;
  }
  
  public stationsFilter = [...this.stations];
  
  selectedId?:number;

  get isLoadingPlaces(){
    return this.placesService.getStations();
  }


  constructor() { }

  ngOnInit() {}


  flyTo(station:Station){
    this.selectedId = station.id;
    const coords = [station.longitude, station.latitude] as [number, number];
    this.mapService.flyTo(coords);
    this.selected.emit(true);
  }



  onQueryChanged(query:string | null = ''){
    if(query?.length ===0) this.stationsFilter = [...this.stations];

    this.stationsFilter = this.stations.filter((station) => station.stationName.toLowerCase().indexOf(query ? query.toLowerCase() : '') > -1 ||
                                                            station.stationAddress.toLowerCase().indexOf(query ? query.toLowerCase() : '') > -1);

  }

}
