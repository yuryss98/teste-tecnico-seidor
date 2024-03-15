import InMemoryVehicleRepository from '../../db/in-memory-vehicle-repository';
import { Vehicle } from '../entity/vehicle.entity';
import DeleteVehicleUseCase from './delete-vehicle.use-case';

const vehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

describe('Delete vehicle', () => {
  it('Should be able to delete the vehicle', async () => {
    const vehicleRepository = new InMemoryVehicleRepository();
    const newVehicle = new Vehicle(vehicle);
    await vehicleRepository.create(newVehicle);

    const deleteVehicle = new DeleteVehicleUseCase(vehicleRepository);
    await deleteVehicle.execute(newVehicle.id);

    const vehicleDeleted = await vehicleRepository.findById(newVehicle.id);
    expect(vehicleDeleted).toBeFalsy();
  });

  it('Should be able to return null if not found vehicle', async () => {
    const vehicleNotFound = '999999999999999';
    const vehicleRepository = new InMemoryVehicleRepository();
    const deleteVehicle = new DeleteVehicleUseCase(vehicleRepository);
    const vehicleDeleted = await deleteVehicle.execute(vehicleNotFound);

    expect(vehicleDeleted).toEqual(null);
  });
});
