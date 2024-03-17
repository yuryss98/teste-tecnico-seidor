import { Request, Response } from 'express';
import CreateDriverUseCase from '../../domain/use-cases/driver/create-driver.use-case';
import MissingParamError from '../error/missing-param-error';
import GetDriverByIdUseCase from '../../domain/use-cases/driver/get-driver-by-id.use-case';
import GetDriversCase from '../../domain/use-cases/driver/get-drivers.use-case';
import UpdateDriverUseCase from '../../domain/use-cases/driver/update-driver.use-case';
import DeleteDriverUseCase from '../../domain/use-cases/driver/delete-driver.use-case';

export default class DriverController {
  constructor(
    private createDriverUseCase: CreateDriverUseCase,
    private getDriverByIdUseCase: GetDriverByIdUseCase,
    private getDriversCase: GetDriversCase,
    private updateDriverUseCase: UpdateDriverUseCase,
    private deleteDriverUseCase: DeleteDriverUseCase,
  ) { }

  create = async (req: Request, res: Response) => {
    const requiredField = 'name';
    if (!req.body[requiredField]) throw new MissingParamError();

    const driverCreated = await this.createDriverUseCase.execute(req.body);

    return res.status(201).json({
      message: driverCreated.id,
    });
  };

  getById = async (req: Request, res: Response) => {
    const driver = await this.getDriverByIdUseCase.execute(req.params.driverId);

    return res.status(200).json({
      message: {
        id: driver.id,
        name: driver.name,
      },
    });
  };

  getDrivers = async (req: Request, res: Response) => {
    const drivers = await this.getDriversCase.execute(req.query.name as string);

    return res.status(200).json({
      message: drivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
      })),
    });
  };

  update = async (req: Request, res: Response) => {
    const requiredField = 'name';
    if (!req.body[requiredField]) throw new MissingParamError();

    await this.updateDriverUseCase.execute(req.body, req.params.driverId);

    return res.status(204).end();
  };

  delete = async (req: Request, res: Response) => {
    await this.deleteDriverUseCase.execute(req.params.driverId);

    return res.status(204).end();
  };
}
