import { Driver } from '../entity/driver.entity';

export default abstract class DriverRepository {
  abstract create(driver: Driver): Promise<string>;
  abstract findById(driverId: string): Promise<Driver | null>;
  abstract findAll(name?: string): Promise<Driver[]>;
  abstract update(driver: Driver): Promise<void>;
  abstract delete(driver: Driver): Promise<void>;
}
