import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, NgFor]
})
export class CatalogueComponent  implements OnInit {
  
  @Input({required: true}) nombreImagen!: string;
  @Input({required: true}) value!: string;
  @Input({required: true}) selected!: boolean;
  @Input({required: true }) nombreVehiculos!: vehiculo;

  constructor() { }

  ngOnInit() {}
  
  xd(){
    console.log(this.selected);
  }

}

export interface vehiculo {
  name: string;
}
