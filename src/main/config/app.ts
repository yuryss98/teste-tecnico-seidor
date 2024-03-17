import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import errorHandler from '../middleware/error-handle';
import driverRoutes from '../routes/driver.routes';
import vehicleRoutes from '../routes/vehicle.routes';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());

app.use('/driver', driverRoutes);
app.use('/vehicle', vehicleRoutes);

app.use(errorHandler);

export default app;
