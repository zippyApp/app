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
  
  segment: string = 'salidas'; 
  selectedVehicle?: string | string[]  | null;
  
  public vehicles =['bike', 'e-bike', 'scooter'];
  public nombreUsuarios: usuario[] = [{name:'Alejandra'}, {name: 'Jorge'}, {name: 'Johan'}];
  public tiempoMax!: 'SALIDA' | 'LLEGADA';
  public tipoViaje = ['Instantáneo: ', 'Reserva: '];
  public estadoViaje = ['salida:'];
  public shouldShowEstadoViaje: boolean = true; // visibilidad de estadoViaje

  @ViewChild('select') select?: any;

  constructor() { }

  ngOnInit() {
    this.tipoViaje = [''];
  } 

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
  viewVehicles() {
    this.tipoViaje = [''];
    this.tiempoMax = 'SALIDA';
  }

  viewStations() {
    this.tipoViaje = ['Instantáneo: ', 'Reserva: '];
    this.tiempoMax = 'LLEGADA';
    this.shouldShowEstadoViaje = false; // esconde estadoViaje cuando oprime botón de llegadas
  }

selectVehicle(vehicle:string | string[] | null){
this.selectedVehicle = vehicle;
}

}
export interface usuario {
  name: string;
}
