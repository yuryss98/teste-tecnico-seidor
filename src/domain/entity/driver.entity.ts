import { IDriver } from '../interface/vehicle.interface';

export class Driver {
  private _props: IDriver;

  constructor(props: IDriver) {
    this._props = { ...props };
  }

  get name() {
    return this._props.name;
  }
}
