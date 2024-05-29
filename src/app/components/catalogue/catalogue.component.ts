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
  selectedNumber: number = 0; // Valor inicial


  constructor(private alertCtrl: AlertController,private storageService: StorageService) {}
 
  ngOnInit() {
    this.selectedOption = this.storageService.getValue(this.nombreVehiculos.id) || 'Sin actualizar';
    this.selectedNumber = +this.storageService.getValue(this.nombreVehiculos.name) || 0;
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
          cssClass: 'secondary',
          handler: (data) => {
            if (data) {
            this.selectedOption = data; // Capturar la opción seleccionada
            this.storageService.setValue(this.nombreVehiculos.id, this.selectedOption); // Guardar el valor en localStorage
            console.log('Confirm Ok', data);
          }
        }
        }
      ]
    });
    await alert.present();
  }

  

  async presentBattery(){
    const alert2 = await this.alertCtrl.create({
      header: 'Ajustar batería actual del vehículo',
      inputs: [ {
        type: 'number',
        name: 'range',
        min: 0,
        max: 100,
        value: this.selectedNumber,     
      }
    ],
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
          cssClass: 'secondary',
          handler: (data2) => {
            this.selectedNumber = data2.range; // Capturar la opción seleccionada
            this.storageService.setValue(this.nombreVehiculos.name, this.selectedNumber.toString()); // Guardar el valor en localStorage
            console.log('Confirm Ok', data2);
          }
        }
      ]
    });
    await alert2.present();
  }
  
  xd(){
    console.log(this.selected);
  }

}
export interface vehiculo {
  name: string;
  id: string;
}


