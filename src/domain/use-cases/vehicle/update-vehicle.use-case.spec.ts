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

  it('Should be able to return null if not found vehicle', async () => {
    const vehicleNotFound = '999999999999999';
    const vehicleRepository = new InMemoryVehicleRepository();
    const updateVehicle = new UpdateVehicleUseCase(vehicleRepository);
    const vehicleUpdated = await updateVehicle.execute(vehicle2, vehicleNotFound);

    expect(vehicleUpdated).toEqual(null);
  });
});
