import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonIcon, IonFabButton, IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, IonMenuButton,  IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss'],
  standalone: true,
  imports: [IonContent, IonCol, IonIcon, IonFabButton, 
    IonAccordionGroup, IonList, IonItem, IonRow, IonAccordion, 
    IonSegment, IonSegmentButton, IonLabel, IonMenu, IonButtons, 
    IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, HeaderComponent]
})
export class StationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
