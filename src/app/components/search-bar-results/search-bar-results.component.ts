import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Station } from 'src/app/interfaces/station';
import { MapService } from 'src/app/services/map.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrls: ['./search-bar-results.component.scss'],
  standalone: true,
  imports: [IonicModule,HttpClientModule],
  providers:[HttpClientModule]
})
export class SearchBarResultsComponent  implements OnInit {
  @Output() selected:EventEmitter<boolean> = new EventEmitter<boolean>();

    private mapService:MapService = inject(MapService);
    private placesService:PlacesService = inject(PlacesService);

  get stations(){
    return this.placesService.stations;
   }
   public stationsFilter = [...this.stations];
  selectedId:string = '';

  get isLoadingPlaces(){
    return this.placesService.getStations();
  }


  constructor() { }

  ngOnInit() {}


  flyTo(station:any){
    // this.selectedId = station.id;
    // const [lng, lat] = station;
    // this.mapService.flyTo([lng, lat]);
    this.selected.emit(true);
  }

  getDirections(station:Station){
    if(!this.placesService.userLocation) throw Error('No hay ubicación del usuario');

    const start = this.placesService.userLocation!;
    const end =  [station.latitud, station.longitud] as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }

  onQueryChanged(query:string | null = ''){
    if(query?.length ===0) this.stationsFilter = [...this.stations];

    this.stationsFilter = this.stations.filter((station) => station.nombreEstacion.toLowerCase().indexOf(query!) > -1);

  }

}
