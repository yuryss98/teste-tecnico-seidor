import { VehicleUtilizationEntity } from '../entity/vehicle-utilization.entity';

export default abstract class VehicleUtilizationRepository {
  abstract create(vehicleUtilization: VehicleUtilizationEntity): Promise<string>;
  abstract findAll(): Promise<VehicleUtilizationEntity[]>;
  abstract findById(vehicleUtilizationId: string): Promise<VehicleUtilizationEntity>;
  abstract driverIsUsingVehicle(driverId: string): Promise<boolean>;
  abstract vehicleIsInUse(vehicleId: string): Promise<boolean>;
  abstract finishVehicleUtilization(vehicleUtilization: VehicleUtilizationEntity): Promise<void>;
}
