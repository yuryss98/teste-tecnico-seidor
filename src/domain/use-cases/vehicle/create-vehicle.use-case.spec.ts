import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import CreateVehicleUseCase from './create-vehicle.use-case';

const newVehicle = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

describe('Create vehicle use case', () => {
  it('Should be able to create a new vehicle', async () => {
    const vehicleRepository = new InMemoryVehicleRepository();
    const createVehicle = new CreateVehicleUseCase(vehicleRepository);

    const vehicle = await createVehicle.execute(newVehicle);

    expect(vehicleRepository.vehicles).toHaveLength(1);
    expect(vehicleRepository.vehicles[0]).toEqual(vehicle);
  });
});
