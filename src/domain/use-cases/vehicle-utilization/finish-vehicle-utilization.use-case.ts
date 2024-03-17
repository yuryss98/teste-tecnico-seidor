import VehicleUtilizationConflictError from '../../error/vehicle-utilization-conflict.error';
import VehicleUtilizationNotFoundError from '../../error/vehicle-utilization-not-found.error';
import VehicleUtilizationRepository from '../../repository/vehicle-utilization.repository';

export default class FinishVehiclesUtilizationUseCase {
  constructor(
    private vehicleUtilizationRepository: VehicleUtilizationRepository,
  ) {}

  async execute(vehicleUtilizationId: string): Promise<void> {
    const vehiclesUtilization = await this
      .vehicleUtilizationRepository.findById(vehicleUtilizationId);

    if (!vehiclesUtilization) throw new VehicleUtilizationNotFoundError();

    if (!vehiclesUtilization.vehicleUtilizationIsActive) {
      throw new VehicleUtilizationConflictError();
    }

    vehiclesUtilization.finishVehicleUtilization();

    await this.vehicleUtilizationRepository.finishVehicleUtilization(vehiclesUtilization);
  }
}
