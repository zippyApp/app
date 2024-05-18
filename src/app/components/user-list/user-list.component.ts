/*Acá se configuran los tipos de vehículos*/
/*crear otro que lo que haga es crear una tarjeta por cada viaje que va a salir de la estación 
 o uno por cada que vaya  llegar de la estación */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { IonicModule,IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports:[UserComponent, IonicModule]
})
export class UserListComponent  implements OnInit {

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
