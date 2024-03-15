import { IDriver } from '../../interface/driver.interface';
import DriverRepository from '../../repository/driver.repository';

export default class UpdateDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(newDriver: IDriver, driverId: string): Promise<void> {
    const driver = await this.driverRepository.findById(driverId);
    if (!driver) return null;

    driver.updateDriver(newDriver);
    return this.driverRepository.update(driver);
  }
}
