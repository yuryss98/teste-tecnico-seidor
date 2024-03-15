/* eslint-disable max-lines-per-function */
import InMemoryVehicleRepository from '../../../db/in-memory-vehicle-repository';
import { Vehicle } from '../../entity/vehicle.entity';
import GetVehiclesCase from './get-vehicles.use-case';

const newVehicle1 = {
  plate: 'ABC-1234',
  color: 'Black',
  brand: 'Porsche',
};

const newVehicle2 = {
  plate: 'DFG-5678',
  color: 'White',
  brand: 'Ferrari',
};

const newVehicle3 = {
  plate: 'HIJ-9101',
  color: 'White',
  brand: 'Ferrari',
};

const newVehicle4 = {
  plate: 'KLM-9012',
  color: 'Red',
  brand: 'Ferrari',
};

describe('Get vehicles', () => {
  const vehicleRepository = new InMemoryVehicleRepository();
  beforeAll(async () => {
    const vehicle1 = new Vehicle(newVehicle1);
    const vehicle2 = new Vehicle(newVehicle2);
    const vehicle3 = new Vehicle(newVehicle3);
    const vehicle4 = new Vehicle(newVehicle4);
    await vehicleRepository.create(vehicle1);
    await vehicleRepository.create(vehicle2);
    await vehicleRepository.create(vehicle3);
    await vehicleRepository.create(vehicle4);
  });

  it('Should be able to return all vehicles', async () => {
    const getVehicles = new GetVehiclesCase(vehicleRepository);
    const vehicles = await getVehicles.execute();
    expect(vehicles).toHaveLength(4);
  });

  it('Should be able to return all white vehicles', async () => {
    const getVehicles = new GetVehiclesCase(vehicleRepository);
    const vehicles = await getVehicles.execute('white');
    expect(vehicles).toHaveLength(2);
  });

  it('Should be able to return all Ferrari brand vehicles', async () => {
    const getVehicles = new GetVehiclesCase(vehicleRepository);
    const vehicles = await getVehicles.execute(undefined, 'ferrari');
    expect(vehicles).toHaveLength(3);
  });

  it('Should be able to return all white ferrari brand vehicles', async () => {
    const getVehicles = new GetVehiclesCase(vehicleRepository);
    const vehicles = await getVehicles.execute('white', 'ferrari');
    expect(vehicles).toHaveLength(2);
  });
});
