import CreateDriverUseCase from '../../domain/use-cases/driver/create-driver.use-case';
import InMemoryDriverRepository from '../../db/in-memory-driver-repository';
import DriverController from '../../presentation/controllers/driver.controller';

export const makeDriverController = (): DriverController => {
  const driverRepository = new InMemoryDriverRepository();
  const createDriverUseCase = new CreateDriverUseCase(driverRepository);
  return new DriverController(createDriverUseCase);
};
