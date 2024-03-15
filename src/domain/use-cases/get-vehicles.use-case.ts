import { Vehicle } from '../entity/vehicle.entity';
import VehicleRepository from '../repository/vehicle.repository';

export default class GetVehiclesCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(color?: string, brand?: string): Promise<Vehicle[]> {
    const vehicles = await this.vehicleRepository.findAll(color, brand);
    return vehicles;
  }
}
