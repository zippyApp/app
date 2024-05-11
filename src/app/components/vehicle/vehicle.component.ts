import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule]
})
export class VehicleComponent  implements OnInit {


  @Input({required: true}) nombreImagen!: string;
  @Input({required: true}) value!: string;
  @Input({required: true}) tipoViaje!: string;
  @Input({required: true}) selected!: boolean;

  constructor() { }

  ngOnInit() {}

  xd(){
    console.log(this.selected);
  }

}
