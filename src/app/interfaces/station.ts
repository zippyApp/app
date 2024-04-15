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
  'CONFIRMADO',
  'LLEGADA-ORIGEN' ,
  'LLEGADA-DESTINO' }

