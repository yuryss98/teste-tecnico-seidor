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

  it('Should be able to return null if not found driver', async () => {
    const driverNotFound = '999999999999999';
    const driverRepository = new InMemoryDriverRepository();
    const getDriverById = new GetDriverByIdUseCase(driverRepository);
    const driverFound = await getDriverById.execute(driverNotFound);

    expect(driverFound).toEqual(null);
  });
});
