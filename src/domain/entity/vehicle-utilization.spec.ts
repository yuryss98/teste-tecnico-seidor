/* eslint-disable max-lines-per-function */
import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';
import { VehicleUtilization } from './vehicle-utilization.entity';

const plate = 'ABC-1234';
const color = 'Black';
const brand = 'Porsche';
const driverName = 'Driver name';
const startDate = new Date('2024-03-13');
const endDate = new Date('2024-03-14');
const utilizationMotive = 'Utilization motive';

const makeVehicle = (): Vehicle => new Vehicle({
  plate,
  color,
  brand,
});

const makeDriver = (): Driver => new Driver({
  name: driverName,
});

const makeSut = (): VehicleUtilization => {
  const driver = makeDriver();
  const vehicle = makeVehicle();
  return new VehicleUtilization({
    driver,
    vehicle,
    startDate,
    endDate,
    utilizationMotive,
  });
};

describe('Vehicle Utilization entity', () => {
  it('Should be able to create a new vehicle utilization', () => {
    const sut = makeSut();

    expect(sut).toBeTruthy();
    expect(sut.driver.name).toBe(driverName);
    expect(sut.vehicle.plate).toBe(plate);
    expect(sut.vehicle.color).toBe(color);
    expect(sut.vehicle.brand).toBe(brand);
    expect(sut.startDate.toISOString()).toBe(startDate.toISOString());
    expect(sut.endDate.toISOString()).toBe(endDate.toISOString());
    expect(sut.utilizationMotive).toBe(utilizationMotive);
  });
});
