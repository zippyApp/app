import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButton,IonBackButton, IonButtons, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule,  IonHeader, IonToolbar, IonTitle, IonBackButton, IonButton, IonIcon, IonButtons]  
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() showBackText: boolean = false; 
  @Input() isModal: boolean = false;
 
  constructor() { }

  ngOnInit() {}

}
