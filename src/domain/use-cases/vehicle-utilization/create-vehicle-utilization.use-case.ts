import VehicleUtilizationRepository from '../../repository/vehicle-utilization.repository';
import DriverRepository from '../../repository/driver.repository';
import VehicleRepository from '../../repository/vehicle.repository';
import DriverNotFoundError from '../../error/driver-not-found.error';
import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import { ICreateVehicleUtilization } from '../../interface/vehicle-utilization.interface';
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';
import VehicleUtilizationConflictDriverError
  from '../../error/vehicle-utilization-conflict-driver.error';
import VehicleUtilizationConflictVehicleError
  from '../../error/vehicle-utilization-conflict-vehicle.error';

export default class CreateVehicleUtilizationUseCase {
  constructor(
    private vehicleUtilizationRepository: VehicleUtilizationRepository,
    private driverRepository: DriverRepository,
    private vehicleRepository: VehicleRepository,
  ) {}

  async execute(
    newVehicleUtilization: ICreateVehicleUtilization,
  ): Promise<VehicleUtilizationEntity> {
    const { driver, vehicle } = await this._verifyCanCreateVehicleUtilization(
      newVehicleUtilization.driverId,
      newVehicleUtilization.vehicleId,
    );

    const vehicleUtilization = new VehicleUtilizationEntity(
      {
        utilizationMotive: newVehicleUtilization.utilizationMotive,
        startDate: new Date(),
        vehicleUtilizationIsActive: true,
      },
      driver,
      vehicle,
    );

    const vehicleUtilizationId = await this.vehicleUtilizationRepository.create(vehicleUtilization);
    vehicleUtilization.id = vehicleUtilizationId;
    return vehicleUtilization;
  }

  private async _verifyCanCreateVehicleUtilization(driverId: string, vehicleId: string) {
    const driver = await this.driverRepository.findById(driverId);
    if (!driver) throw new DriverNotFoundError();

    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundError();

    const driverIsUsingVehicle = await this
      .vehicleUtilizationRepository.driverIsUsingVehicle(driverId);
    if (driverIsUsingVehicle) throw new VehicleUtilizationConflictDriverError();

    const vehicleIsInUse = await this.vehicleUtilizationRepository.vehicleIsInUse(vehicleId);
    if (vehicleIsInUse) throw new VehicleUtilizationConflictVehicleError();

    return {
      driver,
      vehicle,
    };
  }
}
