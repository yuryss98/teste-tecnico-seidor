export interface IVehicle {
  plate: string;
  color: string;
  brand: string;
}

export interface IDriver {
  name: string;
}

export interface IVehicleUtilization {
  driver: IDriver;
  vehicle: IVehicle;
  startDate: Date;
  endDate: Date;
  utilizationMotive: string;
}
