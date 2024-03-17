import GetDriverByIdUseCase from '../../domain/use-cases/driver/get-driver-by-id.use-case';
import CreateDriverUseCase from '../../domain/use-cases/driver/create-driver.use-case';
import InMemoryDriverRepository from '../../db/in-memory-driver-repository';
import DriverController from '../../presentation/controllers/driver.controller';
import GetDriversCase from '../../domain/use-cases/driver/get-drivers.use-case';
import UpdateDriverUseCase from '../../domain/use-cases/driver/update-driver.use-case';
import DeleteDriverUseCase from '../../domain/use-cases/driver/delete-driver.use-case';

export const driverRepository = new InMemoryDriverRepository();

export const makeDriverController = (): DriverController => {
  const createDriverUseCase = new CreateDriverUseCase(driverRepository);
  const getDriverByIdUseCase = new GetDriverByIdUseCase(driverRepository);
  const getDriversUseCase = new GetDriversCase(driverRepository);
  const updateDriverUseCase = new UpdateDriverUseCase(driverRepository);
  const deleteDriverUseCase = new DeleteDriverUseCase(driverRepository);

  return new DriverController(
    createDriverUseCase,
    getDriverByIdUseCase,
    getDriversUseCase,
    updateDriverUseCase,
    deleteDriverUseCase,
  );
};
