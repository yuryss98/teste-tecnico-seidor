import VehicleRepository from '../repository/vehicle.repository';

export default class DeleteVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(vehicleId: string): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) return null;

    vehicle.deleteVehicle();
    return this.vehicleRepository.delete(vehicle);
  }
}
