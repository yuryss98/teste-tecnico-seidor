import { Driver } from '../../entity/driver.entity';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import UpdateDriverUseCase from './update-driver.use-case';

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

  it('Should be able to return null if not found driver', async () => {
    const driverNotFound = '999999999999999';
    const driverRepository = new InMemoryDriverRepository();
    const updateDriver = new UpdateDriverUseCase(driverRepository);
    const driverUpdated = await updateDriver.execute(driver2, driverNotFound);

    expect(driverUpdated).toEqual(null);
  });
});
