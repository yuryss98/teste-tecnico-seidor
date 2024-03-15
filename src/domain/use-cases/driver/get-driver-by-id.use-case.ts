import { Driver } from '../../entity/driver.entity';
import DriverRepository from '../../repository/driver.repository';

export default class GetDriverByIdUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(driverId: string): Promise<Driver> {
    const driver = await this.driverRepository.findById(driverId);
    return driver;
  }
}
