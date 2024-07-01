import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonTitle, IonItem, IonIcon, IonLabel, IonToolbar, IonList, IonHeader } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, RouterLinkWithHref, IonRouterOutlet, IonMenu, IonContent, IonTitle, IonList, IonIcon, IonLabel, IonItem, IonToolbar, IonHeader],
})
export class AppComponent {
  constructor() {}
}
