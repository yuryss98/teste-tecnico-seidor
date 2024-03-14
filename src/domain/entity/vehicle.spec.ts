import { Vehicle } from './vehicle.entity';

const plate = 'ABC-1234';
const color = 'Black';
const brand = 'Porsche';
const makeSut = (): Vehicle => new Vehicle({
  plate,
  color,
  brand,
});

describe('Vehicle entity', () => {
  it('Should be able to create a new vehicle', () => {
    const sut = makeSut();

    expect(sut).toBeTruthy();
    expect(sut.plate).toBe(plate);
    expect(sut.color).toBe(color);
    expect(sut.brand).toBe(brand);
  });
});
