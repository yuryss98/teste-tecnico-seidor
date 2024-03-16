import DriverRepository from 'src/domain/repository/driver.repository';
import { Driver } from '../../entity/driver.entity';
import { IDriver } from '../../interface/driver.interface';

export default class CreateDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(newDriver: IDriver): Promise<Driver> {
    const driver = new Driver(newDriver);
    const driverId = await this.driverRepository.create(driver);

    driver.id = driverId;
    return driver;
  }
}
