import VehicleUtilizationRepository from '../../repository/vehicle-utilization.repository';
import DriverRepository from '../../repository/driver.repository';
import VehicleRepository from '../../repository/vehicle.repository';
import DriverNotFoundError from '../../error/driver-not-found.error';
import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import { ICreateVehicleUtilization } from '../../interface/vehicle-utilization.interface';
import { VehicleUtilizationEntity } from '../../entity/vehicle-utilization.entity';

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

    const vehicleUtilization = new VehicleUtilizationEntity({
      driver,
      vehicle,
      utilizationMotive: newVehicleUtilization.utilizationMotive,
    });

    const vehicleUtilizationId = await this.vehicleUtilizationRepository.create(vehicleUtilization);
    vehicleUtilization.id = vehicleUtilizationId;
    return vehicleUtilization;
  }

  private async _verifyCanCreateVehicleUtilization(driverId: string, vehicleId: string) {
    const driver = await this.driverRepository.findById(driverId);
    if (!driver) throw new DriverNotFoundError();

    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundError();

    return {
      driver,
      vehicle,
    };
  }
}
