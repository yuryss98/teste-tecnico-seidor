import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import { Vehicle } from '../../entity/vehicle.entity';
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

    const vehicleFound = await vehicleRepository.findById(newVehicle.id);
    expect(vehicleFound).toBeFalsy();
  });

  it('Should throw an error when not finding a vehicle', async () => {
    const invalidVehicleId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const vehicleRepository = new InMemoryVehicleRepository();
    const deleteVehicle = new DeleteVehicleUseCase(vehicleRepository);

    expect(async () => {
      await deleteVehicle.execute(invalidVehicleId);
    }).rejects.toThrow(VehicleNotFoundError);
  });
});
