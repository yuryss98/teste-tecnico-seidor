/* eslint-disable max-lines-per-function */
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';
import { Vehicle } from '../../entity/vehicle.entity';
import { Driver } from '../../entity/driver.entity';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import InMemoryVehicleUtilizationRepository
  from '../../../db/in-memory-vehicle-utilization-repository';
import GetVehiclesUtilizationUseCase from './get-vehicles-utilization.use-case';

const newVehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

const newDriver = {
  name: 'Driver name',
};

describe('Get vehicles utilization use case', () => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const driverRepository = new InMemoryDriverRepository();
  const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();

  beforeAll(async () => {
    const vehicle = new Vehicle(newVehicle);
    await vehicleRepository.create(vehicle);

    const driver = new Driver(newDriver);
    await driverRepository.create(driver);

    const vehicleUtilization = new VehicleUtilizationEntity(
      {
        utilizationMotive: 'Vehicle utilization to travel',
        startDate: new Date(),
        vehicleUtilizationIsActive: true,
      },
      driver,
      vehicle,
    );

    await vehicleUtilizationRepository.create(vehicleUtilization);
  });

  it('Should be able to return all vehicles utilization', async () => {
    const getVehiclesUtilization = new GetVehiclesUtilizationUseCase(vehicleUtilizationRepository);

    const vehiclesUtilization = await getVehiclesUtilization.execute();

    expect(vehiclesUtilization).toHaveLength(1);
    expect(vehiclesUtilization[0].driver.name).toBe(newDriver.name);
    expect(vehiclesUtilization[0].vehicle.brand).toBe(newVehicle.brand);
    expect(vehiclesUtilization[0].vehicle.color).toBe(newVehicle.color);
    expect(vehiclesUtilization[0].vehicle.plate).toBe(newVehicle.plate);
  });
});
