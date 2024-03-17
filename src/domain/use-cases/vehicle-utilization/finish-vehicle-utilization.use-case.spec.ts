/* eslint-disable max-lines-per-function */
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';
import { Vehicle } from '../../entity/vehicle.entity';
import { Driver } from '../../entity/driver.entity';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import InMemoryVehicleUtilizationRepository
  from '../../../db/in-memory-vehicle-utilization-repository';
import FinishVehiclesUtilizationUseCase from './finish-vehicle-utilization.use-case';
import VehicleUtilizationNotFoundError from '../../error/vehicle-utilization-not-found.error';

const newVehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

const newDriver = {
  name: 'Driver name',
};

const vehicleUtilizationId = 'aaaaaaaa-bbbb-1ccc-8ddd-eeeeeeeeeeee';

describe('Finish vehicle utilization use case', () => {
  const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();

  beforeAll(async () => {
    const vehicleRepository = new InMemoryVehicleRepository();
    const driverRepository = new InMemoryDriverRepository();

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
      vehicleUtilizationId,
    );

    await vehicleUtilizationRepository.create(vehicleUtilization);
  });

  it('Should be able to possible to finished a vehicle utilization', async () => {
    const finishVehiclesUtilization = new FinishVehiclesUtilizationUseCase(
      vehicleUtilizationRepository,
    );

    await finishVehiclesUtilization.execute(vehicleUtilizationId);

    const vehicleUtilization = await vehicleUtilizationRepository.findById(vehicleUtilizationId);

    expect(vehicleUtilization.vehicleUtilizationIsActive).toBe(false);
    expect(vehicleUtilization.endDate).toBeInstanceOf(Date);
  });

  it('Should throw an error when not finding a vehicle utilization', async () => {
    const finishVehiclesUtilization = new FinishVehiclesUtilizationUseCase(
      vehicleUtilizationRepository,
    );

    const vehicleUtilizationNotFound = 'bbbbbbbb-bbbb-1ccc-8ddd-eeeeeeeeeeee';

    expect(async () => {
      await finishVehiclesUtilization.execute(vehicleUtilizationNotFound);
    }).rejects.toThrow(VehicleUtilizationNotFoundError);
  });
});
