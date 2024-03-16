import VehicleNotFoundError from '../../error/vehicle-not-found.error';
import VehicleRepository from '../../repository/vehicle.repository';

export default class DeleteVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(vehicleId: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) throw new VehicleNotFoundError();

    vehicle.deleteVehicle();
    return this.vehicleRepository.delete(vehicle);
  }
}
