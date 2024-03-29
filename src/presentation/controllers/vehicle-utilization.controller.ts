/* eslint-disable max-lines-per-function */
import { Request, Response } from 'express';
import MissingParamError from '../error/missing-param-error';
import CreateVehicleUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/create-vehicle-utilization.use-case';
import FinishVehiclesUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/finish-vehicle-utilization.use-case';
import GetVehiclesUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/get-vehicles-utilization.use-case';

export default class VehicleUtilizationController {
  constructor(
    private createVehicleUtilizationUseCase: CreateVehicleUtilizationUseCase,
    private finishVehiclesUtilizationUseCase: FinishVehiclesUtilizationUseCase,
    private getVehiclesUtilizationUseCase: GetVehiclesUtilizationUseCase,
  ) { }

  create = async (req: Request, res: Response) => {
    const requiredFields = ['driverId', 'vehicleId', 'utilizationMotive'];
    requiredFields.forEach((field) => {
      if (!req.body[field]) throw new MissingParamError();
    });

    const vehicleUtilizationCreated = await this.createVehicleUtilizationUseCase.execute(req.body);

    return res.status(201).json({
      message: vehicleUtilizationCreated.id,
    });
  };

  getVehiclesUtilization = async (req: Request, res: Response) => {
    const vehiclesUtilization = await this.getVehiclesUtilizationUseCase.execute();

    return res.status(200).json({
      message: vehiclesUtilization.map((vehicleUtilization) => ({
        id: vehicleUtilization.id,
        utilizationMotive: vehicleUtilization.utilizationMotive,
        startDate: vehicleUtilization.startDate,
        vehicleUtilizationIsActive: vehicleUtilization.vehicleUtilizationIsActive,
        endDate: vehicleUtilization.endDate || null,
        driver: {
          id: vehicleUtilization.driver.id,
          name: vehicleUtilization.driver.name,
        },
        vehicle: {
          id: vehicleUtilization.vehicle.id,
          brand: vehicleUtilization.vehicle.brand,
          color: vehicleUtilization.vehicle.color,
          plate: vehicleUtilization.vehicle.plate,
        },
      })),
    });
  };

  finish = async (req: Request, res: Response) => {
    await this.finishVehiclesUtilizationUseCase.execute(req.params.vehicleUtilizationId);

    return res.status(204).end();
  };
}
