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
    const driver = await this.driverRepository.findById(newVehicleUtilization.driverId);
    if (!driver) throw new DriverNotFoundError();

    const vehicle = await this.vehicleRepository.findById(newVehicleUtilization.vehicleId);
    if (!vehicle) throw new VehicleNotFoundError();

    const vehicleUtilization = new VehicleUtilizationEntity({
      driver,
      vehicle,
      utilizationMotive: newVehicleUtilization.utilizationMotive,
    });

    const vehicleUtilizationId = await this.vehicleUtilizationRepository.create(vehicleUtilization);
    vehicleUtilization.id = vehicleUtilizationId;
    return vehicleUtilization;
  }
}
