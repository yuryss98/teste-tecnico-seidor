import { randomUUID } from 'crypto';
import { IVehicleUtilization } from '../interface/vehicle-utilization.interface';

export class VehicleUtilizationEntity {
  private _props: IVehicleUtilization;
  private _id: string;
  private _startDate: Date;
  private _endDate: Date;
  private _vehicleInUse: boolean;

  constructor(props: IVehicleUtilization, id?: string, startDate?: Date) {
    this._props = { ...props };
    this._id = id ?? randomUUID();
    this._startDate = startDate ?? new Date();
    this._vehicleInUse = true;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get driver() {
    return this._props.driver;
  }

  get vehicle() {
    return this._props.vehicle;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get utilizationMotive() {
    return this._props.utilizationMotive;
  }

  get vehicleInUse() {
    return this._vehicleInUse;
  }

  finishVehicleUtilization() {
    this._endDate = new Date();
    this._vehicleInUse = false;
  }
}
