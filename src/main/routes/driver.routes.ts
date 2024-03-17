import express from 'express';
import { makeDriverController } from '../factories/driver';

const router = express.Router();
const driverController = makeDriverController();

router.post('/create', driverController.create);
router.get('/all', driverController.getDrivers);
router.get('/:driverId', driverController.getById);

export default router;
