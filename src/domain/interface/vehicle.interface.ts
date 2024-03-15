import { IDriver } from './driver.interface';

export interface IVehicle {
  plate: string;
  color: string;
  brand: string;
}

export interface IVehicleUtilization {
  driver: IDriver;
  vehicle: IVehicle;
  startDate: Date;
  endDate: Date;
  utilizationMotive: string;
}
