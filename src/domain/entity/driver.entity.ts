import { randomUUID } from 'crypto';
import { IDriver } from '../interface/driver.interface';

export class Driver {
  private _props: IDriver;
  private _id: string;
  private _status: boolean;

  constructor(props: IDriver, id?: string) {
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

  get name() {
    return this._props.name;
  }

  get status() {
    return this._status;
  }

  updateDriver(driver: IDriver) {
    this._props = driver;
  }

  deleteDriver() {
    this._status = false;
  }
}
