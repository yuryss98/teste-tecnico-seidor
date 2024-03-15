import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import CreateDriverUseCase from './create-driver.use-case';

const newDriver = {
  name: 'Driver name',
};

describe('Create driver use case', () => {
  it('Should be able to create a new driver', async () => {
    const driverRepository = new InMemoryDriverRepository();
    const createDriver = new CreateDriverUseCase(driverRepository);

    const driver = await createDriver.execute(newDriver);

    expect(driverRepository.drivers).toHaveLength(1);
    expect(driverRepository.drivers[0]).toEqual(driver);
  });
});
