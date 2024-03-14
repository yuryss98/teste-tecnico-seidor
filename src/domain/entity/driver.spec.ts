import { Driver } from './driver.entity';

describe('Driver entity', () => {
  it('Should be able to create a new driver', () => {
    const name = 'Driver name';
    const driver = new Driver({
      name,
    });

    expect(driver).toBeTruthy();
    expect(driver.name).toBe(name);
  });
});
