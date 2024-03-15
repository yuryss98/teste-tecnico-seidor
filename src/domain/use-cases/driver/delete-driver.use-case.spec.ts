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

  it('Should be able to return null if not found driver', async () => {
    const driverNotFound = '999999999999999';
    const driverRepository = new InMemoryDriverRepository();
    const deleteDriver = new DeleteDriverUseCase(driverRepository);
    const driverDeleted = await deleteDriver.execute(driverNotFound);

    expect(driverDeleted).toEqual(null);
  });
});
