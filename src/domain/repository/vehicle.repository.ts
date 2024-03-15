import { Vehicle } from '../entity/vehicle.entity';

export default abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<string>;
  abstract findById(vehicleId: string): Promise<Vehicle | null>;
  abstract findAll(color?: string, brand?: string): Promise<Vehicle[]>;
  abstract update(vehicle: Vehicle): Promise<void>;
  abstract delete(vehicle: Vehicle): Promise<void>;
}
