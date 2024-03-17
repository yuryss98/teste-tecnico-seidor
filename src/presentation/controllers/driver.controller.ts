import { Request, Response } from 'express';
import CreateDriverUseCase from '../../domain/use-cases/driver/create-driver.use-case';
import MissingParamError from '../error/missing-param-error';

export default class DriverController {
  constructor(
    private createDriverUseCase: CreateDriverUseCase,
  ) { }

  create = async (req: Request, res: Response) => {
    const requiredField = 'name';
    if (!req.body[requiredField]) throw new MissingParamError();

    const driverCreated = await this.createDriverUseCase.execute(req.body);

    return res.status(201).json({
      message: driverCreated.id,
    });
  };
}
