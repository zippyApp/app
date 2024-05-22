import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, IonMenuButton,  IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { TripListComponent } from 'src/app/components/trip-list/trip-list.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: true,
  imports: [IonContent, NgFor, HeaderComponent, TripListComponent, IonHeader, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonCol, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonMenuButton, IonMenu, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TripsPage implements OnInit {
  segment: string = 'salidas'; 
  selectedVehicle?: string | string[]  | null;
  
  public vehicles =['bike', 'e-bike', 'scooter'];
  public nombreUsuarios: usuario[] = [{name:'Alejandra'}, {name: 'Jorge'}, {name: 'Johan'}];
  public tiempoMax!: 'SALIDA' | 'LLEGADA';
  public tipoViaje= ['INSTANTANEO', 'RESERVA', ''];
  public estadoViaje = ['salida:'];
  public shouldShowEstadoViaje: boolean = true; // visibilidad de estadoViaje

  @ViewChild('select') select?: any;

  constructor() { }

  ngOnInit(){
    this.tipoViaje = [''];
  } 

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
  confirmDepartures() {
    this.tipoViaje = [''];
    this.tiempoMax = 'SALIDA';
  }

  confirmArrivals() {
    this.tipoViaje = ['INSTANTANEO', 'RESERVA'];
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


