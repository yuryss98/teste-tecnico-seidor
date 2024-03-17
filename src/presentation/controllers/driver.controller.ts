import { Request, Response } from 'express';
import CreateDriverUseCase from '../../domain/use-cases/driver/create-driver.use-case';
import MissingParamError from '../error/missing-param-error';
import GetDriverByIdUseCase from '../../domain/use-cases/driver/get-driver-by-id.use-case';

export default class DriverController {
  constructor(
    private createDriverUseCase: CreateDriverUseCase,
    private getDriverByIdUseCase: GetDriverByIdUseCase,
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
}
