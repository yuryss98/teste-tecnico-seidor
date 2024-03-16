import DriverNotFoundError from '../../error/driver-not-found.error';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import { Driver } from '../../entity/driver.entity';
import GetDriverByIdUseCase from './get-driver-by-id.use-case';

const newDriver = {
  name: 'Driver name',
};

describe('Get driver by id use case', () => {
  it('Should be able to return a driver by id', async () => {
    const driverRepository = new InMemoryDriverRepository();
    const driver = new Driver(newDriver);
    await driverRepository.create(driver);

    const getDriverById = new GetDriverByIdUseCase(driverRepository);
    const driverFound = await getDriverById.execute(driver.id);
    expect(driverFound).toEqual(driver);
  });

  it('Should throw an error when not finding a driver', async () => {
    const invalidDriverId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const driverRepository = new InMemoryDriverRepository();
    const getDriverById = new GetDriverByIdUseCase(driverRepository);

    expect(async () => {
      await getDriverById.execute(invalidDriverId);
    }).rejects.toThrow(DriverNotFoundError);
  });
});
