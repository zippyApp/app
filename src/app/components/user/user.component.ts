import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule]
})
export class UserComponent  implements OnInit {

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
