import InMemoryVehicleUtilizationRepository
  from '../../../db/in-memory-vehicle-utilization-repository';
import CreateVehicleUtilizationUseCase from './create-vehicle-utilization.use-case';

const newVehicleUtilization = {
  driver: {
    name: 'Driver name',
  },
  vehicle: {
    plate: 'ABC-1234',
    color: 'Black',
    brand: 'Porsche',
  },
  utilizationMotive: 'Vehicle utilization to travel',
};

describe('Create vehicle utilization use case', () => {
  it('Should be able to create a new vehicle utilization', async () => {
    const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
    const createVehicleUtilization = new CreateVehicleUtilizationUseCase(
      vehicleUtilizationRepository,
    );

    const vehiclesUtilization = await createVehicleUtilization.execute(newVehicleUtilization);

    expect(vehicleUtilizationRepository.vehiclesUtilization).toHaveLength(1);
    expect(vehicleUtilizationRepository.vehiclesUtilization[0]).toEqual(vehiclesUtilization);
  });
});
