export interface Station{

  id :number;
  stationName: string;
  stationAddress: string;
  latitude :number;
  longitude: number;
  stationStatus: StationStatus;
  capacity: number;
  lastMaintenance: Date;

}

export interface StationStatus{
  id: number;
  stationName: string;
}

export enum Stage{
  'DESTINO' ,
  'ORIGEN' ,
  'CONFIRMACION' ,
  'CAMBIO_DESTINO',
  'CAMBIO_ORIGEN',
  'CONFIRMANDO',
  'SELECCION-VEHICULO',
  'CONDICIONES',
  'CONFIRMADO',
  'LLEGADA-ORIGEN' ,
  'AUTORIZACION-EMPLEADO',
  'LLEGADA-DESTINO' }

// Path: src/app/interfaces/user.ts
