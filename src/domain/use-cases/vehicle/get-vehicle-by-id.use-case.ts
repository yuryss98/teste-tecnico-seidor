import { Vehicle } from '../../entity/vehicle.entity';
import VehicleRepository from '../../repository/vehicle.repository';

export default class GetVehicleByIdUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(vehicleId: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    return vehicle;
  }
}
