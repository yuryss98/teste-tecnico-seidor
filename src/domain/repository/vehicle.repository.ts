import { Vehicle } from '../entity/vehicle.entity';

export default abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<string>;
  abstract findById(vehicleId: string): Promise<Vehicle | null>;
  abstract update(vehicle: Vehicle): Promise<void>;
}
