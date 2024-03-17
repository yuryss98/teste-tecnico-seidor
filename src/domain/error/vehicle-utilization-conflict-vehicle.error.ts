import CustomError from './custom.error';

export default class VehicleUtilizationConflictVehicleError extends CustomError {
  constructor() {
    super('CONFLICT', 'This vehicle already in use');
  }
}
