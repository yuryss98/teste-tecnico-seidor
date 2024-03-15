import { Vehicle } from '../domain/entity/vehicle.entity';
import VehicleRepository from '../domain/repository/vehicle.repository';

export default class InMemoryVehicleRepository implements VehicleRepository {
  public vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<string> {
    this.vehicles.push(vehicle);
    return vehicle.id;
  }

  async findById(vehicleId: string): Promise<Vehicle | null> {
    const vehicle = this.vehicles.find(({ id, status }) => id === vehicleId && status);
    if (!vehicle) return null;
    return vehicle;
  }

  async findAll(color?: string, brand?: string): Promise<Vehicle[]> {
    if (color && brand) {
      return this.vehicles.filter((vehicle) => (
        vehicle.color.toLowerCase() === color.toLowerCase()
        && vehicle.brand.toLowerCase() === brand.toLowerCase()
      ));
    }

    if (color) {
      return this.vehicles.filter((vehicle) => (
        vehicle.color.toLowerCase() === color.toLowerCase()
      ));
    }

    if (brand) {
      return this.vehicles.filter((vehicle) => (
        vehicle.brand.toLowerCase() === brand.toLowerCase()
      ));
    }

    return this.vehicles;
  }

  async update(newVehicle: Vehicle): Promise<void> {
    this.vehicles.map((vehicle) => {
      if (vehicle.id === newVehicle.id) {
        return newVehicle;
      }

      return vehicle;
    });
  }

  async delete(deletedVehicle: Vehicle): Promise<void> {
    this.vehicles.map((vehicle) => {
      if (vehicle.id === deletedVehicle.id) {
        return deletedVehicle;
      }

      return vehicle;
    });
  }
}
