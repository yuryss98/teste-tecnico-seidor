import { IVehicleUtilization } from '../interface/vehicle.interface';

export class VehicleUtilization {
  private _props: IVehicleUtilization;

  constructor(props: IVehicleUtilization) {
    this._props = { ...props };
  }

  get driver() {
    return this._props.driver;
  }

  get vehicle() {
    return this._props.vehicle;
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
}
