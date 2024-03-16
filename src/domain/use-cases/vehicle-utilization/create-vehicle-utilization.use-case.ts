import VehicleUtilizationRepository from '../../repository/vehicle-utilization.repository';
import { IVehicleUtilization } from '../../interface/vehicle-utilization.interface';
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';

export default class CreateVehicleUtilizationUseCase {
  constructor(private vehicleUtilizationRepository: VehicleUtilizationRepository) {}

  async execute(newVehicleUtilization: IVehicleUtilization): Promise<VehicleUtilizationEntity> {
    const vehicleUtilization = new VehicleUtilizationEntity(newVehicleUtilization);
    const vehicleUtilizationId = await this.vehicleUtilizationRepository.create(vehicleUtilization);
    vehicleUtilization.id = vehicleUtilizationId;
    return vehicleUtilization;
  }
}
