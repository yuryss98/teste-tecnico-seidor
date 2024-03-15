import { randomUUID } from 'crypto';
import { IVehicle } from '../interface/vehicle.interface';

export class Vehicle {
  private _props: IVehicle;
  private _id: string;
  private _status: boolean;

  constructor(props: IVehicle, id?: string) {
    this._props = { ...props };
    this._id = id ?? randomUUID();
    this._status = true;
  }

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get plate() {
    return this._props.plate;
  }

  get color() {
    return this._props.color;
  }

  get brand() {
    return this._props.brand;
  }

  get status() {
    return this._status;
  }

  updateVehicle(vehicle: IVehicle) {
    this._props = vehicle;
  }

  deleteVehicle() {
    this._status = false;
  }
}
