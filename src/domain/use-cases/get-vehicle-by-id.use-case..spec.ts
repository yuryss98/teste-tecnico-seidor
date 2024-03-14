import InMemoryVehicleRepository from '../../db/in-memory-vehicle-repository';
import { Vehicle } from '../entity/vehicle.entity';
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

  it('Should be able to return null if not found vehicle', async () => {
    const vehicleNotFound = '999999999999999';
    const vehicleRepository = new InMemoryVehicleRepository();
    const getVehicleById = new GetVehicleByIdUseCase(vehicleRepository);
    const vehicleFound = await getVehicleById.execute(vehicleNotFound);

    expect(vehicleFound).toEqual(null);
  });
});
