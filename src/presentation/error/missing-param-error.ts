import CustomError from '../../domain/error/custom.error';

export default class MissingParamError extends CustomError {
  constructor() {
    super('BAD_REQUEST', 'Missing param error');
  }
}
