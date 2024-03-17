import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import driverRoutes from '../routes/driver.routes';
import errorHandler from '../middleware/error-handle';

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/driver', driverRoutes);

app.use(errorHandler);

export default app;
