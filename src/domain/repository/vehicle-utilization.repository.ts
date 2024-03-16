import { VehicleUtilizationEntity } from '../entity/vehicle-utilization.entity';

export default abstract class VehicleUtilizationRepository {
  abstract create(vehicleUtilization: VehicleUtilizationEntity): Promise<string>;
  abstract findAll(): Promise<VehicleUtilizationEntity[]>;
  abstract finishVehicleUtilization(vehicleUtilization: VehicleUtilizationEntity): Promise<void>;
}
