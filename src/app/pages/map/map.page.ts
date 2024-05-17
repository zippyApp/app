import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlacesService } from 'src/app/services/places.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MapViewComponent } from 'src/app/components/map-view/map-view.component';
import { ZippyLogoComponent } from 'src/app/components/zippy-logo/zippy-logo.component';
import { addIcons } from 'ionicons';
import { IonModal } from '@ionic/angular';
import {
  locateOutline,
  bicycle,
  swapVerticalOutline,
  checkmarkOutline,
  chevronForwardCircle,
  returnUpBackOutline,
} from 'ionicons/icons'
import { HeaderComponent } from '../../components/header/header.component';
import { MapService } from 'src/app/services/map.service';
import { SearchBarResultsComponent } from 'src/app/components/search-bar-results/search-bar-results.component';
import { HttpClientModule } from '@angular/common/http';
import { Stage, Station } from 'src/app/interfaces/station';
import { VehicleListComponent } from 'src/app/components/vehicle-list/vehicle-list.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LoadingComponent, MapViewComponent, ZippyLogoComponent, SearchBarResultsComponent, HttpClientModule, HeaderComponent, VehicleListComponent],
  providers: [HttpClientModule]
})
export class MapPage {
  @ViewChild('modal') modal?: IonModal;
  @ViewChild('modaSelVeh') modaSelVeh?: IonModal;
  @ViewChild('modalCond') modalCond?: IonModal;
  @ViewChild('modalItin') modalItin?: IonModal;


  public vehicles =['bike', 'e-bike', 'scooter'];

  public tipoViaje!: 'INSTANTANEO' | 'RESERVADO';

  private placesServices: PlacesService = inject(PlacesService);
  private mapService: MapService = inject(MapService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  selectedVehicle?: string | string[]  | null;

  get stage() {
    return this.mapService.stage;
  }

  get originDuration() {
    return this.mapService.originDuration;
  }

  get originDistance() {
    return this.mapService.originDistance;
  }
  get destinationDistance() {
    return this.mapService.destinationDistance;
  }

  get destinationDuration() {
    return this.mapService.destinationDuration;
  }

  get originStation() {
    return this.mapService.originStation;
  }

  get destinationStation() {
    return this.mapService.destinationStation;
  }

  form?: FormGroup;

  @ViewChild('select') select?: any;


  constructor(private menu: MenuController) {
    addIcons({ locateOutline, bicycle, swapVerticalOutline, checkmarkOutline, chevronForwardCircle, returnUpBackOutline});
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      station: ['']
    })
    await this.placesServices.printCurrentPosition();
    this.placesServices.getStations()
    this.mapService.stageObservable.subscribe(
      (stage:Stage) => {
        if (stage === Stage.CONFIRMACION) {
          this.startTrip();
          // this.mapService.setFitBounds(200,this.placesServices.userLocation! );
        }
      }
    );


  }
  ionViewWillEnter() {
    this.menu.enable(false, 'menu-id'); 
  }

  ionViewWillLeave() {
    this.menu.enable(true, 'menu-id');
  }

  changeStage(stage: Stage) {
    this.mapService.setStage(stage);
    if(stage === Stage.CAMBIO_DESTINO || stage === Stage.CAMBIO_ORIGEN){
      this.mapService.cleanPolylines();
      this.placesServices.getStations();
      this.modal?.present();
    }
    if(stage === Stage['SELECCION-VEHICULO']){{
      this.modaSelVeh?.dismiss();
      this.modalCond?.dismiss();
    }}
  }

  confirmInstantTrip() {
    this.changeStage(6);
    this.tipoViaje = 'INSTANTANEO';

  }

  confirmReservedTrip() {
    this.changeStage(6);
    this.tipoViaje = 'RESERVADO';
  }


  get isUserLocationReady() {
    return this.placesServices.isUserLocationReady;
  }

  goToMyLocation() {

    if (!this.placesServices.isUserLocationReady) throw Error('No hay ubicación del usuario');
    if (!this.mapService.isMapReady) throw Error('No hay mapa');

    this.mapService.flyTo(this.placesServices.userLocation!);
  }

  closeModal(close: boolean) {
    if (close) this.modal?.dismiss();
  }

  swapStations() {
    const aux = this.destinationStation;
    if (this.originStation == null || this.destinationStation == null) return;
    this.mapService.setDestinationStation(this.originStation!);
    this.mapService.setOriginStation(aux!);
    this.startTrip();

  }

  async startTrip() {
    this.mapService.cleanPolylines();
    if (this.originStation == null || this.destinationStation == null) {return};
    if (!this.placesServices.userLocation) throw Error('No hay ubicación del usuario');

    const currentLocation = this.placesServices.userLocation!;
    
    await this.mapService.getRouteToOrgin(currentLocation, this.originStation?.id, 'blue', 'RouteOrigin', this.placesServices.userLocation);
    await this.mapService.getRouteToDestination(this.originStation?.id, this.destinationStation?.id, 'red', 'RouteDestination', this.placesServices.userLocation);

  }

  searchStation(nombreEstacion: string) {
    const station = this.placesServices.stations.find(station => station.stationName.toLowerCase() === nombreEstacion.toLowerCase());
    return station;
  }

  selectVehicle(vehicle:string | string[] | null){
    this.selectedVehicle = vehicle;


  }

  openItin(){
    this.modalItin?.present();

  }


}
