import { Request, Response } from 'express';
import MissingParamError from '../error/missing-param-error';
import CreateVehicleUseCase from '../../domain/use-cases/vehicle/create-vehicle.use-case';
import GetVehicleByIdUseCase from '../../domain/use-cases/vehicle/get-vehicle-by-id.use-case';
import GetVehiclesUseCase from '../../domain/use-cases/vehicle/get-vehicles.use-case';
import UpdateVehicleUseCase from '../../domain/use-cases/vehicle/update-vehicle.use-case';
import DeleteVehicleUseCase from '../../domain/use-cases/vehicle/delete-vehicle.use-case';

export default class VehicleController {
  constructor(
    private createVehicleUseCase: CreateVehicleUseCase,
    private getVehicleByIdUseCase: GetVehicleByIdUseCase,
    private getVehiclesUseCase: GetVehiclesUseCase,
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

  getById = async (req: Request, res: Response) => {
    const vehicle = await this.getVehicleByIdUseCase.execute(req.params.vehicleId);

    return res.status(200).json({
      message: {
        id: vehicle.id,
        brand: vehicle.brand,
        color: vehicle.color,
        plate: vehicle.plate,
      },
    });
  };

  getVehicles = async (req: Request, res: Response) => {
    const vehicles = await this.getVehiclesUseCase
      .execute(req.query.color as string, req.query.brand as string);

    return res.status(200).json({
      message: vehicles.map((vehicle) => ({
        id: vehicle.id,
        brand: vehicle.brand,
        color: vehicle.color,
        plate: vehicle.plate,
      })),
    });
  };

  update = async (req: Request, res: Response) => {
    const requiredFields = ['plate', 'color', 'brand'];
    requiredFields.forEach((field) => {
      if (!req.body[field]) throw new MissingParamError();
    });

    await this.updateVehicleUseCase.execute(req.body, req.params.vehicleId);

    return res.status(204).end();
  };

  delete = async (req: Request, res: Response) => {
    await this.deleteVehicleUseCase.execute(req.params.vehicleId);

    return res.status(204).end();
  };
}
