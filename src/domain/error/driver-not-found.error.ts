import CustomError from './custom.error';

export default class DriverNotFoundError extends CustomError {
  constructor() {
    super('NOT_FOUND', 'Driver does not exists');
  }
}
