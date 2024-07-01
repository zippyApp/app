import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component'; // Asegúrate de que el nombre es correcto
import { IonIcon, IonContent, IonMenu, IonText, IonButton } from '@ionic/angular/standalone';
import { ZippyLogoComponent } from '../../components/zippy-logo/zippy-logo.component'
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonContent, IonText, IonIcon, IonButton, IonMenu,
    HeaderComponent, CustomInputComponent, ZippyLogoComponent, RouterLink
  ]
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;

  constructor(private menu: MenuController) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  ionViewWillEnter() {
    this.menu.enable(false, 'menu-id'); 
  }

  ionViewWillLeave() {
    this.menu.enable(true, 'menu-id');
  }
  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    }
  }

}
