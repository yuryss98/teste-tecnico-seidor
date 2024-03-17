export interface IVehicleUtilization {
  utilizationMotive: string;
  startDate: Date;
  vehicleUtilizationIsActive: boolean;
  endDate?: Date;
}

export interface ICreateVehicleUtilization {
  driverId: string,
  vehicleId: string,
  utilizationMotive: string;
}
