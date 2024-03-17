/* eslint-disable max-lines-per-function */
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';
import { Vehicle } from '../../entity/vehicle.entity';
import { Driver } from '../../entity/driver.entity';
import CreateVehicleUtilizationUseCase from './create-vehicle-utilization.use-case';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import InMemoryDriverRepository from '../../../db/in-memory-driver-repository';
import InMemoryVehicleUtilizationRepository
  from '../../../db/in-memory-vehicle-utilization-repository';
import DriverNotFoundError from '../../error/driver-not-found.error';
import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import VehicleUtilizationConflictDriverError
  from '../../error/vehicle-utilization-conflict-driver.error';
import VehicleUtilizationConflictVehicleError
  from '../../error/vehicle-utilization-conflict-vehicle.error';

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
const newDriverId = 'dddddddd-bbbb-1ccc-8ddd-eeeeeeeeeeee';

const newVehicleUtilization = {
  vehicleId,
  driverId,
  utilizationMotive: 'Vehicle utilization to travel',
};

describe('Create vehicle utilization use case', () => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const driverRepository = new InMemoryDriverRepository();
  const vehicle = new Vehicle(newVehicle, vehicleId);
  const driver = new Driver(newDriver, driverId);
  const driver1 = new Driver(newDriver, newDriverId);

  beforeAll(async () => {
    await vehicleRepository.create(vehicle);
    await driverRepository.create(driver);
    await driverRepository.create(driver1);
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

  it('Should throw an error when not finding a driver', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
      driverRepository,
      vehicleRepository,
    );

    const invalidDriverId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';

    expect(async () => {
      await createVehicleUtilization.execute({
        ...newVehicleUtilization,
        driverId: invalidDriverId,
      });
    }).rejects.toThrow(DriverNotFoundError);
  });

  it('Should throw an error when not finding a vehicle', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
      driverRepository,
      vehicleRepository,
    );

    const invalidVehicleId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';

    expect(async () => {
      await createVehicleUtilization.execute({
        ...newVehicleUtilization,
        vehicleId: invalidVehicleId,
      });
    }).rejects.toThrow(VehicleNotFoundError);
  });

  it('Should throw an error if the driver is already using a vehicle', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    vehicleUtilizationRepository.vehiclesUtilization = [];
    const vehiclesUtilization = new VehicleUtilizationEntity(
      {
        startDate: new Date(),
        utilizationMotive: 'New vehicle utilization motive',
        vehicleUtilizationIsActive: true,
      },
      driver,
      vehicle,
    );
    await vehicleUtilizationRepository.create(vehiclesUtilization);

    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
      driverRepository,
      vehicleRepository,
    );

    expect(async () => {
      await createVehicleUtilization.execute(newVehicleUtilization);
    }).rejects.toThrow(VehicleUtilizationConflictDriverError);
  });

  it('Should throw an error if the vehicle is in use', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    vehicleUtilizationRepository.vehiclesUtilization = [];
    const vehiclesUtilization = new VehicleUtilizationEntity(
      {
        startDate: new Date(),
        utilizationMotive: 'New vehicle utilization motive',
        vehicleUtilizationIsActive: true,
      },
      driver,
      vehicle,
    );
    await vehicleUtilizationRepository.create(vehiclesUtilization);

    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
      driverRepository,
      vehicleRepository,
    );

    expect(async () => {
      await createVehicleUtilization.execute({
        ...newVehicleUtilization,
        driverId: newDriverId,
      });
    }).rejects.toThrow(VehicleUtilizationConflictVehicleError);
  });
});
