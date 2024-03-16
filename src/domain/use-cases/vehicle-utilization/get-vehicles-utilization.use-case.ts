import VehicleUtilizationRepository from '../../repository/vehicle-utilization.repository';
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';

export default class GetVehiclesUtilizationUseCase {
  constructor(
    private vehicleUtilizationRepository: VehicleUtilizationRepository,
  ) {}

  async execute(): Promise<VehicleUtilizationEntity[]> {
    const vehiclesUtilization = await this.vehicleUtilizationRepository.findAll();
    return vehiclesUtilization;
  }
}
