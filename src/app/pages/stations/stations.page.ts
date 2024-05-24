import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, IonMenuButton,  IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { CatalogueListComponent } from 'src/app/components/catalogue-list/catalogue-list.component';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
  standalone: true,
  imports: [IonContent, IonCol, IonIcon, IonFabButton, 
    IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, 
    IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, 
    IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, HeaderComponent, CatalogueListComponent]
})
export class StationsPage implements OnInit {
  
  segment: string = 'vehiculo'; 
  selectedVehicle?: string | string[]  | null;
  
  public vehicles =['bike', 'e-bike', 'scooter', 'bike2', 'e-scooter'];
  public nombreVehiculos = [{name:'Vehículo 1234'}, {name:'Vehículo 1528'}, {name: 'Vehículo 1835'}, {name:'Vehículo 2307'}, {name:'Vehículo 2269'}];

  @ViewChild('select') select?: any;

  constructor() { }

  ngOnInit() {
  } 

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  viewVehicles() {
  }

  selectVehicle(vehicle:string | string[] | null){
  this.selectedVehicle = vehicle;
  }

}
export interface vehiculo {
  name: string;
}
