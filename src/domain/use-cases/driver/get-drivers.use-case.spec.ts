/* eslint-disable max-lines-per-function */
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import { Driver } from '../../entity/driver.entity';
import GetDriversCase from './get-drivers.use-case';

const newDriver1 = {
  name: 'Driver name 1',
};

const newDriver2 = {
  name: 'Driver name 1',
};

const newDriver3 = {
  name: 'Driver name 3',
};

describe('Get drivers', () => {
  const driverRepository = new InMemoryDriverRepository();
  beforeAll(async () => {
    const driver1 = new Driver(newDriver1);
    const driver2 = new Driver(newDriver2);
    const driver3 = new Driver(newDriver3);
    await driverRepository.create(driver1);
    await driverRepository.create(driver2);
    await driverRepository.create(driver3);
  });

  it('Should be able to return all drivers', async () => {
    const getDrivers = new GetDriversCase(driverRepository);
    const drivers = await getDrivers.execute();
    expect(drivers).toHaveLength(3);
  });

  it('Should be able to return all drivers with name (driver name 1)', async () => {
    const getDrivers = new GetDriversCase(driverRepository);
    const drivers = await getDrivers.execute('driver name 1');
    expect(drivers).toHaveLength(2);
  });
});
