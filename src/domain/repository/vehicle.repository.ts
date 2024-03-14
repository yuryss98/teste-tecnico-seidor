import { Vehicle } from '../entity/vehicle.entity';

export default abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<string>;
}
