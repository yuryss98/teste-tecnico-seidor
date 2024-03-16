/* eslint-disable max-lines-per-function */
import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import { Vehicle } from '../../entity/vehicle.entity';
import UpdateVehicleUseCase from './update-vehicle.use-case';

const vehicle1 = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

const vehicle2 = {
  plate: 'HIJ-9012',
  color: 'Green',
  brand: 'BMW',
};

describe('Update vehicle', () => {
  it('Should be able to update the vehicle', async () => {
    const vehicleRepository = new InMemoryVehicleRepository();
    const newVehicle = new Vehicle(vehicle1);
    await vehicleRepository.create(newVehicle);

    const updateVehicle = new UpdateVehicleUseCase(vehicleRepository);
    await updateVehicle.execute(vehicle2, newVehicle.id);

    const vehicleUpdated = await vehicleRepository.findById(newVehicle.id);
    expect(vehicleUpdated.color).toEqual(vehicle2.color);
    expect(vehicleUpdated.brand).toEqual(vehicle2.brand);
    expect(vehicleUpdated.plate).toEqual(vehicle2.plate);
  });

  it('Should throw an error when not finding a vehicle', async () => {
    const invalidVehicleId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const vehicleRepository = new InMemoryVehicleRepository();
    const updateVehicle = new UpdateVehicleUseCase(vehicleRepository);

    expect(async () => {
      await updateVehicle.execute(vehicle2, invalidVehicleId);
    }).rejects.toThrow(VehicleNotFoundError);
  });
});
