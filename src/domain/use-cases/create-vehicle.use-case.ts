import { Vehicle } from '../entity/vehicle.entity';
import { IVehicle } from '../interface/vehicle.interface';
import VehicleRepository from '../repository/vehicle.repository';

export default class CreateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(newVehicle: IVehicle): Promise<Vehicle> {
    const vehicle = new Vehicle(newVehicle);
    const vehicleId = await this.vehicleRepository.create(vehicle);
    vehicle.id = vehicleId;
    return vehicle;
  }
}
