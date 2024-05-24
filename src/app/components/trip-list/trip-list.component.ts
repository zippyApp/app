import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TripComponent } from '../trip/trip.component';
import { CommonModule, NgFor } from '@angular/common';
import { IonicModule,IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  standalone: true,
  imports:[TripComponent, CommonModule, NgFor, IonicModule]
})
export class TripListComponent  implements OnInit {

  
  @ViewChild('accordion') accordion?: IonAccordionGroup;

  @Input({required: true}) tipoViaje!: string[];

  @Input({required: true}) estadoViaje!: string[];

  @Input({required: true}) tiempoMax!: 'SALIDA' | 'LLEGADA';

  @Input({required : true}) vehicles!: string[];

  @Input({required: true }) nombreUsuarios!: usuario[];

  @Output() selectedVehicle = new EventEmitter<string | string[] | null>();

  valueSelected: string | string[] | null | undefined;

  constructor() { }
 
  ngOnInit() {}
  
  emitValue(){
    this.valueSelected = this.accordion?.value;
    if(!this.valueSelected) { this.selectedVehicle.emit(null); return;}
    this.selectedVehicle.emit(this.valueSelected);
  }


}
export interface usuario {
  name: string;
}


