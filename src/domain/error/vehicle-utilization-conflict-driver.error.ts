import CustomError from './custom.error';

export default class VehicleUtilizationConflictDriverError extends CustomError {
  constructor() {
    super('CONFLICT', 'This driver is using a vehicle');
  }
}
