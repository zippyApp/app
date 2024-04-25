import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    RouterLink,
    CustomInputComponent, HeaderComponent, IonItem, IonList, IonSelect, IonSelectOption
  ]
})
export class SignUpPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    first_names: new FormControl('', [Validators.required, Validators.minLength(4)]),
    last_names: new FormControl('', [Validators.required, Validators.minLength(4)]),
    document_type: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]),
    occupation: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  });

  constructor() { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    }
  }
}
