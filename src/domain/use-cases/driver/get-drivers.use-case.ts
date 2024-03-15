import { Driver } from '../../entity/driver.entity';
import DriverRepository from '../../repository/driver.repository';

export default class GetDriversCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(name?: string): Promise<Driver[]> {
    const drivers = await this.driverRepository.findAll(name);
    return drivers;
  }
}
