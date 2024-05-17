import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, IonMenuButton,  IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonCol, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonMenuButton, IonMenu, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TripsPage implements OnInit {
  segment: string = 'salidas'; 
  salidasUsuarios: any[] = [];
  llegadasUsuarios: any[] = [];  
  selectedUsuario?: string | string[]  | null;

  constructor() { }

  ngOnInit() {
    this.loadSalidasUsuarios();
    this.loadLlegadasUsuarios();
  }
  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
  
  loadSalidasUsuarios() {
    this.salidasUsuarios = [
      { id: 1, nombre: 'Alejandra', tipo: 'Bicicleta', estado: 'Disponible' },
      { id: 2, nombre: 'Jorge', tipo: 'Bicicleta', estado: 'En uso' },
      { id: 3, nombre: 'Johan', tipo: 'Bicicleta', estado: 'Disponible' },
      { id: 4, nombre: 'Mary', tipo: 'Bicicleta', estado: 'Disponible' },
    ];
  }
  
  loadLlegadasUsuarios() {
    this.llegadasUsuarios = [
      { id: 5, nombre: 'Gian', tipo: 'Bicicleta', estado: 'En reparación' },
      { id: 6, nombre: 'Valentina', tipo: 'Bicicleta', estado: 'Disponible' },
      { id: 7, nombre: 'Oscar', tipo: 'Bicicleta', estado: 'Disponible' },
      { id: 8, nombre: 'Camila', tipo: 'Bicicleta', estado: 'Disponible' },

    ];
  }

selectUsuario(usuario: any) {
  this.selectedUsuario = usuario;
  
}

}
