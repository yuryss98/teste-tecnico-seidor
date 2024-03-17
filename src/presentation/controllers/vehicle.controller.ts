import { Request, Response } from 'express';
import MissingParamError from '../error/missing-param-error';
import CreateVehicleUseCase from '../../domain/use-cases/vehicle/create-vehicle.use-case';
import GetVehicleByIdUseCase from '../../domain/use-cases/vehicle/get-vehicle-by-id.use-case';
import GetVehiclesCase from '../../domain/use-cases/vehicle/get-vehicles.use-case';
import UpdateVehicleUseCase from '../../domain/use-cases/vehicle/update-vehicle.use-case';
import DeleteVehicleUseCase from '../../domain/use-cases/vehicle/delete-vehicle.use-case';

export default class VehicleController {
  constructor(
    private createVehicleUseCase: CreateVehicleUseCase,
    private getVehicleByIdUseCase: GetVehicleByIdUseCase,
    private getVehiclesCase: GetVehiclesCase,
    private updateVehicleUseCase: UpdateVehicleUseCase,
    private deleteVehicleUseCase: DeleteVehicleUseCase,
  ) { }

  create = async (req: Request, res: Response) => {
    const requiredFields = ['plate', 'color', 'brand'];

    requiredFields.forEach((field) => {
      if (!req.body[field]) throw new MissingParamError();
    });

    const vehicleCreated = await this.createVehicleUseCase.execute(req.body);

    return res.status(201).json({
      message: vehicleCreated.id,
    });
  };
}
