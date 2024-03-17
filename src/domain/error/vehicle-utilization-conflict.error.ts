import CustomError from './custom.error';

export default class VehicleUtilizationConflictError extends CustomError {
  constructor() {
    super('CONFLICT', 'Vehicle utilization has already now been terminated');
  }
}
