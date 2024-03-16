import DriverNotFoundError from '../../error/driver-not-found.error';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import { Driver } from '../../entity/driver.entity';
import DeleteDriverUseCase from './delete-driver.use-case';

const driver = {
  name: 'Driver name',
};

describe('Delete driver', () => {
  it('Should be able to delete the driver', async () => {
    const driverRepository = new InMemoryDriverRepository();
    const newDriver = new Driver(driver);
    await driverRepository.create(newDriver);

    const deleteDriver = new DeleteDriverUseCase(driverRepository);
    await deleteDriver.execute(newDriver.id);

    const driverFound = await driverRepository.findById(newDriver.id);
    expect(driverFound).toBeFalsy();
  });

  it('Should throw an error when not finding a driver', async () => {
    const invalidDriverId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const driverRepository = new InMemoryDriverRepository();
    const deleteDriver = new DeleteDriverUseCase(driverRepository);

    expect(async () => {
      await deleteDriver.execute(invalidDriverId);
    }).rejects.toThrow(DriverNotFoundError);
  });
});
