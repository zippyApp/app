export interface Station{

  id :number;
  nombreEstacion: string;
  latitud :number;
  longitud: number;

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

