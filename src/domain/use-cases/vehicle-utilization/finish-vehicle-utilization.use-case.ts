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

    vehiclesUtilization.finishVehicleUtilization();

    await this.vehicleUtilizationRepository.finishVehicleUtilization(vehiclesUtilization);
  }
}
