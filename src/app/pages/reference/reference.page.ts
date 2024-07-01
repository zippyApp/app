import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    CustomInputComponent, HeaderComponent, IonMenu, IonItem, IonList, IonSelect, IonSelectOption]
})
export class ReferencePage implements OnInit {
  form: FormGroup = new FormGroup({
    first_names: new FormControl('', [Validators.required, Validators.minLength(4)]),
    last_names: new FormControl('', [Validators.required, Validators.minLength(4)]),
    document_type: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  });

  constructor(private menu: MenuController) { }
  ionViewWillEnter() {
    this.menu.enable(false, 'menu-id'); 
  }

  ionViewWillLeave() {
    this.menu.enable(true, 'menu-id');
  }
  ngOnInit() {
  }

  

}
