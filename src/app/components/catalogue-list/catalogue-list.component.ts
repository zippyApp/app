import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { CommonModule, NgFor } from '@angular/common';
import { IonicModule,IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-catalogue-list',
  templateUrl: './catalogue-list.component.html',
  styleUrls: ['./catalogue-list.component.scss'],
  standalone: true,
  imports:[CatalogueComponent, CommonModule, NgFor, IonicModule]
})
export class CatalogueListComponent  implements OnInit {
  
  @ViewChild('accordion') accordion?: IonAccordionGroup;

  @Input({required : true}) vehicles!: string[];

  @Input({required: true }) nombreVehiculos!: vehiculo[];

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
export interface vehiculo {
  name: string;
  id: string;
}


