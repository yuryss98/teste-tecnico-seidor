import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import { Vehicle } from '../../entity/vehicle.entity';
import GetVehicleByIdUseCase from './get-vehicle-by-id.use-case';

const newVehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

describe('Get vehicle by id use case', () => {
  it('Should be able to return a vehicle by id', async () => {
    const vehicleRepository = new InMemoryVehicleRepository();
    const vehicle = new Vehicle(newVehicle);
    await vehicleRepository.create(vehicle);

    const getVehicleById = new GetVehicleByIdUseCase(vehicleRepository);
    const vehicleFound = await getVehicleById.execute(vehicle.id);
    expect(vehicleFound).toEqual(vehicle);
  });

  it('Should throw an error when not finding a vehicle', async () => {
    const invalidVehicleId = 'cccccccc-bbbb-1ccc-8ddd-eeeeeeeeeeee';
    const vehicleRepository = new InMemoryVehicleRepository();
    const getVehicleById = new GetVehicleByIdUseCase(vehicleRepository);

    expect(async () => {
      await getVehicleById.execute(invalidVehicleId);
    }).rejects.toThrow(VehicleNotFoundError);
  });
});
