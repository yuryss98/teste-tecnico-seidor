import CustomError from './custom.error';

export default class VehicleNotFoundError extends CustomError {
  constructor() {
    super('NOT_FOUND', 'Vehicle does not exists');
  }
}
