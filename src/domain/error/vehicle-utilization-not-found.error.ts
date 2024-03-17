import CustomError from './custom.error';

export default class VehicleUtilizationNotFoundError extends CustomError {
  constructor() {
    super('NOT_FOUND', 'Vehicle utilization does not exists');
  }
}
