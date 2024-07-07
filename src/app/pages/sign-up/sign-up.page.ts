import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption, IonDatetime, IonModal, IonInput, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';  // Asegúrate de tener la ruta correcta
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    IonContent, IonHeader,
    IonTitle, IonMenu,
    IonToolbar, IonButton,
    IonIcon, RouterLink,
    CustomInputComponent, HeaderComponent,
    IonItem, IonList, IonSelect, IonSelectOption,
    IonDatetime, IonModal, IonInput, IonLabel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignUpPage implements OnInit {
  selectedImage: string | undefined;
  frontImage: string | undefined;
  backImage: string | undefined;
  frontImageRef: string | undefined;
  backImageRef: string | undefined;
  selectedImageREF: string | undefined;
  isDatePickerOpen = false;
  isFirstSection = true;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    firstNames: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastNames: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('1', [Validators.required]),
    number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]),
    occupation: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    birthDate: new FormControl('', [Validators.required]),
    frontImage: new FormControl(''), 
    backImage: new FormControl(''),  
    firstNamesRef: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastNamesRef: new FormControl('', [Validators.required, Validators.minLength(1)]),
    typeRef: new FormControl('1', [Validators.required]),
    numberRef: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8,10}$')]),
    emailRef: new FormControl('', [Validators.required, Validators.email]),
    phoneRef: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    frontImageRef: new FormControl(''), 
    backImageRef: new FormControl('')   
  });

  constructor(private menu: MenuController, private signUpService: SignUpService,  private router: Router) { }

  ionViewWillEnter() {
    this.menu.enable(false, 'menu-id');
  }

  ionViewWillLeave() {
    this.menu.enable(true, 'menu-id');
  }

  submit() {
    if (this.form.valid) {
        const registerData = {
            credential: {
                username: this.form.value.email,
                password: this.form.value.password,
                roleId: 1 
            },
            personalInformation: {
                firstNames: this.form.value.firstNames,
                lastNames: this.form.value.lastNames,
                occupation: this.form.value.occupation,
                email: this.form.value.email,
                document: { 
                    number: this.form.value.number,
                    type: {
                        id: this.form.value.type 
                    },
                    frontImage: "Front_image_usr", 
                    backImage: "biu"    
                },
                phone: this.form.value.phone,
                birthDate: this.form.value.birthDate,
                reference: {
                    firstNames: this.form.value.firstNamesRef,
                    lastNames: this.form.value.lastNamesRef,
                    phone: this.form.value.phoneRef,
                    email: this.form.value.emailRef,
                    document: {
                        number: this.form.value.numberRef,
                        type: {
                            id: this.form.value.typeRef 
                        },
                        frontImage: "fir", 
                        backImage: "bir"    
                    }
                }
            }
        };

        this.signUpService.register(registerData).subscribe(
            response => {
              environment.tokenLogin = response
                console.log('Registro exitoso', response);
                // Maneja la respuesta de éxito
                this.router.navigate(['/auth']); 
            },
            error => {
                console.error('Error en el registro', error);
               
            }

            
        );
    }
}


  ngOnInit() {}

  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  setDate(event: any) {
    const date = new Date(event.detail.value);
    const formattedDate = date.toISOString().split('T')[0]; 
    this.form.controls['birthDate'].setValue(formattedDate);
  }

  goToSecondSection() {
    this.isFirstSection = false;
  }

  async cardImage(side: 'frontal' | 'posterior', section: 'user' | 'reference') {
    try {
        const placeholderImage = 'https://via.placeholder.com/150'; 
        const imageTag = 'placeholder_image_tag';

        if (section === 'user') {
            if (side === 'frontal') {
                this.frontImage = placeholderImage;
                this.form.controls['frontImage'].setValue(imageTag);
            } else {
                this.backImage = placeholderImage;
                this.form.controls['backImage'].setValue(imageTag);
            }
        } else {
            if (side === 'frontal') {
                this.frontImageRef = placeholderImage;
                this.form.controls['frontImageRef'].setValue(imageTag);
            } else {
                this.backImageRef = placeholderImage;
                this.form.controls['backImageRef'].setValue(imageTag);
            }
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
