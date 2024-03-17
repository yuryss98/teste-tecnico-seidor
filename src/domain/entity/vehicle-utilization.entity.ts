import { randomUUID } from 'crypto';
import { IVehicleUtilization } from '../interface/vehicle-utilization.interface';
import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';

export class VehicleUtilizationEntity {
  private _props: IVehicleUtilization;
  private _id: string;
  private _driver: Driver;
  private _vehicle: Vehicle;

  constructor(
    props: IVehicleUtilization,
    driver: Driver,
    vehicle: Vehicle,
    id?: string,
  ) {
    this._props = { ...props };
    this._id = id ?? randomUUID();
    this._driver = driver;
    this._vehicle = vehicle;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get driver() {
    return this._driver;
  }

  get vehicle() {
    return this._vehicle;
  }

  get startDate() {
    return this._props.startDate;
  }

  get endDate() {
    return this._props.endDate;
  }

  get utilizationMotive() {
    return this._props.utilizationMotive;
  }

  get vehicleUtilizationIsActive() {
    return this._props.vehicleUtilizationIsActive;
  }

  finishVehicleUtilization() {
    this._props.endDate = new Date();
    this._props.vehicleUtilizationIsActive = false;
  }
}
