import VehicleController from '../../presentation/controllers/vehicle.controller';
import CreateVehicleUseCase from '../../domain/use-cases/vehicle/create-vehicle.use-case';
import GetVehicleByIdUseCase from '../../domain/use-cases/vehicle/get-vehicle-by-id.use-case';
import GetVehiclesCase from '../../domain/use-cases/vehicle/get-vehicles.use-case';
import UpdateVehicleUseCase from '../../domain/use-cases/vehicle/update-vehicle.use-case';
import DeleteVehicleUseCase from '../../domain/use-cases/vehicle/delete-vehicle.use-case';
import InMemoryVehicleRepository from '../../db/in-memory-vehicle-repository';

export const makeVehicleController = (): VehicleController => {
  const vehicleRepository = new InMemoryVehicleRepository();
  const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository);
  const getVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepository);
  const getVehiclesUseCase = new GetVehiclesCase(vehicleRepository);
  const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepository);
  const deleteVehicleUseCase = new DeleteVehicleUseCase(vehicleRepository);

  return new VehicleController(
    createVehicleUseCase,
    getVehicleByIdUseCase,
    getVehiclesUseCase,
    updateVehicleUseCase,
    deleteVehicleUseCase,
  );
};
