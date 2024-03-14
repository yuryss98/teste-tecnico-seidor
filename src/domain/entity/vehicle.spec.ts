import { Vehicle } from './vehicle.entity';

describe('Vehicle entity', () => {
  it('Should be able to create a new vehicle', () => {
    const plate = 'ABC-1234';
    const color = 'Black';
    const brand = 'Porsche';
    const vehicle = new Vehicle({
      plate,
      color,
      brand,
    });

    expect(vehicle).toBeTruthy();
    expect(vehicle.plate).toBe(plate);
    expect(vehicle.color).toBe(color);
    expect(vehicle.brand).toBe(brand);
  });
});
