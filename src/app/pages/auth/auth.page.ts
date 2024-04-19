import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component'; // Asegúrate de que el nombre es correcto
import { IonIcon, IonContent, IonText , IonButton } from '@ionic/angular/standalone';
import { ZippyLogoComponent } from '../../components/zippy-logo/zippy-logo.component'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonContent, IonText, IonIcon, IonButton,
    HeaderComponent, CustomInputComponent, ZippyLogoComponent, RouterLink
  ]
})
export class AuthPage implements OnInit {
  form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    }
  }
}
