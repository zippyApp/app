import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonInput, IonIcon, IonHeader, IonToolbar, IonTitle, IonItem, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle,
    IonInput, IonIcon, IonItem, IonButton 
  ]
})
export class CustomInputComponent {
  @Input() control!: any;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true;

  ngOnInit() {
    if (this.type === 'password') {
      this.isPassword = true;
    }
  }

  showOrHidePassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}
