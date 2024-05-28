import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, NgFor],
  providers: [StorageService]
})
export class CatalogueComponent  implements OnInit {
  
  @Input({required: true}) nombreImagen!: string;
  @Input({required: true}) value!: string;
  @Input({required: true}) selected!: boolean;
  @Input({required: true }) nombreVehiculos!: vehiculo;
  
  selectedOption: string = '';
  options: string[] = ['Disponible', 'No disponible'];

  constructor(
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) {
    // Recuperar el valor de localStorage al inicializar el componente
    this.selectedOption = this.storageService.getValue();
  }
  ngOnInit() {
  }

  async presentInput(){
    const alert = await this.alertCtrl.create({
      header: 'Seleccionar estado del vehículo',
      inputs: this.options.map(option => ({
        type: 'radio',
        label: option,
        value: option,
        checked: option === this.selectedOption
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          handler: (data) => {
            this.selectedOption = data; // Capturar la opción seleccionada
            this.storageService.setValue(this.selectedOption); // Guardar el valor en localStorage
            console.log('Confirm Ok', data);
          }
        }
      ]
    });
    await alert.present();
  }
  
  xd(){
    console.log(this.selected);
  }

}
export interface vehiculo {
  name: string;
}


