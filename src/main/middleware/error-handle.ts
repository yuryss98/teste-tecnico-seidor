import {
  NextFunction, Request, Response, ErrorRequestHandler,
} from 'express';
import CustomError from '../../domain/error/custom.error';
import mapError from '../../helper/map-error';

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const { name, message } = err as CustomError;
  res.status(mapError[name] || 500).json({ message });
};

export default errorHandler;
