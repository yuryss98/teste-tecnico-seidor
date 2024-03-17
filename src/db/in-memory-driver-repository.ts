import { Driver } from '../domain/entity/driver.entity';
import DriverRepository from '../domain/repository/driver.repository';

export default class InMemoryDriverRepository implements DriverRepository {
  public drivers: Driver[] = [];

  async create(driver: Driver): Promise<string> {
    this.drivers.push(driver);
    return driver.id;
  }

  async findById(driverId: string): Promise<Driver | null> {
    const driver = this.drivers.find(({ id, status }) => id === driverId && status);
    if (!driver) return null;
    return driver;
  }

  async findAll(name?: string): Promise<Driver[]> {
    if (name) {
      return this.drivers.filter((driver) => (
        driver.name.toLowerCase() === name.toLowerCase() && !!driver.status
      ));
    }

    return this.drivers.filter(({ status }) => !!status);
  }

  async update(newDriver: Driver): Promise<void> {
    this.drivers.map((driver) => {
      if (driver.id === newDriver.id) {
        return newDriver;
      }

      return driver;
    });
  }

  async delete(deletedDriver: Driver): Promise<void> {
    this.drivers.map((driver) => {
      if (driver.id === deletedDriver.id) {
        return deletedDriver;
      }

      return driver;
    });
  }
}
