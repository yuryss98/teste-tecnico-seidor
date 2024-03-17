import { VehicleUtilizationEntity } from 'src/domain/entity/vehicle-utilization.entity';
import VehicleUtilizationRepository from '../domain/repository/vehicle-utilization.repository';

export default class InMemoryVehicleUtilizationRepository implements VehicleUtilizationRepository {
  public vehiclesUtilization: VehicleUtilizationEntity[] = [];

  async create(vehicleUtilization: VehicleUtilizationEntity): Promise<string> {
    this.vehiclesUtilization.push(vehicleUtilization);
    return vehicleUtilization.id;
  }

  async findAll(): Promise<VehicleUtilizationEntity[]> {
    return this.vehiclesUtilization;
  }

  async findById(vehicleUtilizationId: string): Promise<VehicleUtilizationEntity> {
    return this.vehiclesUtilization.find(({ id }) => id === vehicleUtilizationId);
  }

  async finishVehicleUtilization(
    finishedVehicleUtilization: VehicleUtilizationEntity,
  ): Promise<void> {
    this.vehiclesUtilization.map((vehicleUtilization) => {
      if (vehicleUtilization.id === finishedVehicleUtilization.id) {
        return finishedVehicleUtilization;
      }

      return vehicleUtilization;
    });
  }

  async driverIsUsingVehicle(driverId: string): Promise<boolean> {
    return this.vehiclesUtilization.some(({ driver, vehicleUtilizationIsActive }) => (
      driver.id === driverId && vehicleUtilizationIsActive
    ));
  }

  async vehicleIsInUse(vehicleId: string): Promise<boolean> {
    return this.vehiclesUtilization.some(({ vehicle, vehicleUtilizationIsActive }) => (
      vehicle.id === vehicleId && vehicleUtilizationIsActive
    ));
  }
}
