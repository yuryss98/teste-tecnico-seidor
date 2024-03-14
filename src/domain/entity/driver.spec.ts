import { Driver } from './driver.entity';

const driverName = 'Driver name';
const makeSut = (): Driver => new Driver({
  name: driverName,
});

describe('Driver entity', () => {
  it('Should be able to create a new driver', () => {
    const sut = makeSut();

    expect(sut).toBeTruthy();
    expect(sut.name).toBe(driverName);
  });
});
