import DriverNotFoundError from '../../error/driver-not-found.error';
import DriverRepository from '../../repository/driver.repository';

export default class DeleteDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(driverId: string): Promise<void> {
    const driver = await this.driverRepository.findById(driverId);
    if (!driver) throw new DriverNotFoundError();

    driver.deleteDriver();
    return this.driverRepository.delete(driver);
  }
}
