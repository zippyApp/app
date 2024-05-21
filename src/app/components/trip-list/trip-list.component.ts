import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TripComponent } from '../trip/trip.component';
import { IonicModule,IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
  standalone: true,
  imports:[TripComponent, IonicModule]
})
export class TripListComponent  implements OnInit {

  
  @ViewChild('accordion') accordion?: IonAccordionGroup;

  @Input({required: true}) tipoViaje!: 'INSTANTANEO' | 'RESERVA';

  @Input({required: true}) estadoViaje!: string[];

  @Input({required: true}) tiempoMax!: 'SALIDA' | 'LLEGADA';

  @Input({required : true}) vehicles!: string[];

  @Input({required : true}) nombreUsuarios!: string[];

  @Output() selectedVehicle = new EventEmitter<string | string[] | null>();


  valueSelected: string | string[] | null | undefined;

  constructor() { }
  private vehicleIconMap: { [key: string]: string } = {
    'bike': 'bike',          // Replace with actual icon name or path
    'e-bike': 'e-bike', // Replace with actual icon name or path
    'scooter': 'scooter'   // Replace with actual icon name or path
  };
  getVehicleIcon(vehicle: string): string {
    return this.vehicleIconMap[vehicle] || 'default-icon'; // Provide a default icon if vehicle is not found
  }
 
  ngOnInit() {}
  
  emitValue(){
    this.valueSelected = this.accordion?.value;
    if(!this.valueSelected) { this.selectedVehicle.emit(null); return;}
    this.selectedVehicle.emit(this.valueSelected);
  }



}
