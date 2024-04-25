import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.page.html',
  styleUrls: ['./card-image.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, RouterLink, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, HeaderComponent]
})
export class CardImagePage implements OnInit {
  selectedImage: string | undefined;
  frontImage: string | undefined;
  backImage: string | undefined;

  constructor() { }

  ngOnInit() {
  }

  async cardImage(side: 'frontal' | 'posterior') {

    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        quality: 90
      });

      if (side === 'frontal') {
        this.frontImage = image.webPath;
      } else {
        this.backImage = image.webPath;
      }

    } catch (error) {
      console.error(error);

    }
  }
  clickButton(event: Event) { 
    const buttonElement = event.currentTarget as HTMLButtonElement;
    buttonElement.blur(); 
    
  }
  

}
