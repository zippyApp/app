import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { IonIcon, IonContent, IonText, IonMenuButton, IonToolbar, IonButtons, IonTitle, IonMenu, IonButton } from '@ionic/angular/standalone';
import { ZippyLogoComponent } from '../../components/zippy-logo/zippy-logo.component';
import { RouterLink, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonContent, IonText, IonIcon, IonButton, IonMenuButton, IonToolbar, IonButtons, IonTitle, IonMenu,
    HeaderComponent, CustomInputComponent, ZippyLogoComponent, RouterLink
  ]
})
export class AuthPage implements OnInit {
  form: FormGroup;
  errorMessage: string = '';

  constructor(private menu: MenuController, private authService: AuthService, private router: Router) { 
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false, 'menu-id'); 
  }

  ionViewWillLeave() {
    this.menu.enable(true, 'menu-id');
  }

  ngOnInit() { }

  submit() {
    if (this.form.valid) {
      const loginRequest = {
        username: this.form.value.username,
        password: this.form.value.password
      };

      this.authService.login(loginRequest).subscribe(
        response => {
          environment.tokenLogin = response.token; 
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['/map']); 
        },
        error => {
          console.error('Error en el inicio de sesión', error);
          if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde.';
          }
        }
      );
    }
  }
}
