/* eslint-disable max-lines-per-function */
import { Vehicle } from '../../entity/vehicle.entity';
import { Driver } from '../../entity/driver.entity';
import CreateVehicleUtilizationUseCase from './create-vehicle-utilization.use-case';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import InMemoryVehicleUtilizationRepository
  from '../../../db/in-memory-vehicle-utilization-repository';

const newVehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};
const vehicleId = 'aaaaaaaa-bbbb-1ccc-8ddd-eeeeeeeeeeee';

const newDriver = {
  name: 'Driver name',
};
const driverId = 'bbbbbbbb-bbbb-1ccc-8ddd-eeeeeeeeeeee';

const newVehicleUtilization = {
  vehicleId,
  driverId,
  utilizationMotive: 'Vehicle utilization to travel',
};

describe('Create vehicle utilization use case', () => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const driverRepository = new InMemoryDriverRepository();

  beforeAll(async () => {
    const vehicle = new Vehicle(newVehicle, vehicleId);
    await vehicleRepository.create(vehicle);

    const driver = new Driver(newDriver, driverId);
    await driverRepository.create(driver);
  });

  it('Should be able to create a new vehicle utilization', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
      driverRepository,
      vehicleRepository,
    );

    const vehiclesUtilization = await createVehicleUtilization.execute(newVehicleUtilization);

    expect(vehicleUtilizationRepository.vehiclesUtilization).toHaveLength(1);
    expect(vehicleUtilizationRepository.vehiclesUtilization[0]).toEqual(vehiclesUtilization);
  });
});
