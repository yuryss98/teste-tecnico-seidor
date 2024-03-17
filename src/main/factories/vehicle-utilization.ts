/* eslint-disable max-lines-per-function */
import { driverRepository } from './driver';
import { vehicleRepository } from './vehicle';
import VehicleUtilizationController
  from '../../presentation/controllers/vehicle-utilization.controller';
import CreateVehicleUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/create-vehicle-utilization.use-case';
import FinishVehiclesUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/finish-vehicle-utilization.use-case';
import GetVehiclesUtilizationUseCase
  from '../../domain/use-cases/vehicle-utilization/get-vehicles-utilization.use-case';
import InMemoryVehicleUtilizationRepository
  from '../../db/in-memory-vehicle-utilization-repository';

export const makeVehicleUtilizationController = (): VehicleUtilizationController => {
  const vehicleUtilizationRepository = new InMemoryVehicleUtilizationRepository();
  const createVehicleUtilizationUseCase = new CreateVehicleUtilizationUseCase(
    vehicleUtilizationRepository,
    driverRepository,
    vehicleRepository,
  );
  const finishVehiclesUtilizationUseCase = new FinishVehiclesUtilizationUseCase(
    vehicleUtilizationRepository,
  );
  const getVehiclesUtilizationUseCase = new GetVehiclesUtilizationUseCase(
    vehicleUtilizationRepository,
  );

  return new VehicleUtilizationController(
    createVehicleUtilizationUseCase,
    finishVehiclesUtilizationUseCase,
    getVehiclesUtilizationUseCase,
  );
};
