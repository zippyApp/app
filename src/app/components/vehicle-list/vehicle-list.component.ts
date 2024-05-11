import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { IonicModule,IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  imports:[VehicleComponent, IonicModule]
})
export class VehicleListComponent  implements OnInit {

  @ViewChild('accordion') accordion?: IonAccordionGroup;

  @Input({required: true}) tipoViaje!: 'INSTANTANEO' | 'RESERVADO';

  @Input({required : true}) vehicles!: string[];

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
