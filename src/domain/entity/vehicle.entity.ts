import { randomUUID } from 'crypto';
import { IVehicle } from '../interface/vehicle.interface';

export class Vehicle {
  private _props: IVehicle;
  private _id: string;

  constructor(props: IVehicle, id?: string) {
    this._props = { ...props };
    this._id = id ?? randomUUID();
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
}
