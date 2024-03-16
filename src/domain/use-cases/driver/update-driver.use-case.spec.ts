import { Driver } from '../../entity/driver.entity';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import UpdateDriverUseCase from './update-driver.use-case';
import DriverNotFoundError from '../../error/driver-not-found.error';

const driver1 = {
  name: 'Driver name 1',
};

const driver2 = {
  name: 'Driver name 2',
};

describe('Update driver', () => {
  it('Should be able to update the driver', async () => {
    const driverRepository = new InMemoryDriverRepository();
    const newDriver = new Driver(driver1);
    await driverRepository.create(newDriver);

    const updateDriver = new UpdateDriverUseCase(driverRepository);
    await updateDriver.execute(driver2, newDriver.id);

    const driverUpdated = await driverRepository.findById(newDriver.id);
    expect(driverUpdated.name).toEqual(driver2.name);
  });

  it('Should throw an error when not finding a driver', async () => {
    const invalidDriverId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const driverRepository = new InMemoryDriverRepository();
    const updateDriver = new UpdateDriverUseCase(driverRepository);

    expect(async () => {
      await updateDriver.execute(driver2, invalidDriverId);
    }).rejects.toThrow(DriverNotFoundError);
  });
});
