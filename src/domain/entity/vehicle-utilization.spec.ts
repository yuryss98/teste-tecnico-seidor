/* eslint-disable max-lines-per-function */
import { Driver } from './driver.entity';
import { Vehicle } from './vehicle.entity';
import { VehicleUtilization } from './vehicle-utilization.entity';

describe('Vehicle Utilization entity', () => {
  it('Should be able to create a new vehicle utilization', () => {
    const driverName = 'Driver name';
    const driver = new Driver({
      name: driverName,
    });

    const plate = 'ABC-1234';
    const color = 'Black';
    const brand = 'Porsche';
    const vehicle = new Vehicle({
      plate,
      color,
      brand,
    });

    const startDate = new Date('2024-03-13');
    const endDate = new Date('2024-03-14');
    const utilizationMotive = 'Utilization motive';
    const vehicleUtilization = new VehicleUtilization({
      driver,
      vehicle,
      startDate,
      endDate,
      utilizationMotive,
    });

    expect(vehicleUtilization).toBeTruthy();
    expect(vehicleUtilization.driver.name).toBe(driverName);
    expect(vehicleUtilization.vehicle.plate).toBe(plate);
    expect(vehicleUtilization.vehicle.color).toBe(color);
    expect(vehicleUtilization.vehicle.brand).toBe(brand);
    expect(vehicleUtilization.startDate.toISOString()).toBe(startDate.toISOString());
    expect(vehicleUtilization.endDate.toISOString()).toBe(endDate.toISOString());
    expect(vehicleUtilization.utilizationMotive).toBe(utilizationMotive);
  });
});
