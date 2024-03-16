import { IDriver } from './driver.interface';
import { IVehicle } from './vehicle.interface';

export interface IVehicleUtilization {
  driver: IDriver;
  vehicle: IVehicle;
  utilizationMotive: string;
}
