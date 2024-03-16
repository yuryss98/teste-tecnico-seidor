import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import { IVehicle } from '../../interface/vehicle.interface';
import VehicleRepository from '../../repository/vehicle.repository';

export default class UpdateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(newVehicle: IVehicle, vehicleId: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundError();

    vehicle.updateVehicle(newVehicle);
    return this.vehicleRepository.update(vehicle);
  }
}
