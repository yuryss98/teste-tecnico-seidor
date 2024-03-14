import { Vehicle } from '../domain/entity/vehicle.entity';
import VehicleRepository from '../domain/repository/vehicle.repository';

export default class InMemoryVehicleRepository implements VehicleRepository {
  public vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<string> {
    this.vehicles.push(vehicle);
    return vehicle.id;
  }
}
