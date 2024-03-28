import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapService } from 'src/app/services/map.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrls: ['./search-bar-results.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class SearchBarResultsComponent  implements OnInit {
  @Input() stations:any[] = [];
  @Output() selected:EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedId:string = '';

  private mapService:MapService = inject(MapService);
  private placesService:PlacesService = inject(PlacesService);

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

}
