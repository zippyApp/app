import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { locateOutline } from 'ionicons/icons';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss'],
  standalone: true,
  imports:[IonicModule]
})
export class BtnMyLocationComponent  implements OnInit {

  constructor() { 
    addIcons({ locateOutline});
  }

  ngOnInit() {}

}
