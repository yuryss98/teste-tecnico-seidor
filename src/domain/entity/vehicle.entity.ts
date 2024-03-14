import { IVehicle } from '../interface/vehicle.interface';

export class Vehicle {
  private _props: IVehicle;

  constructor(props: IVehicle) {
    this._props = { ...props };
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
