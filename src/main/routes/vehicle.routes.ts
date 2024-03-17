import express from 'express';
import { makeVehicleController } from '../factories/vehicle';

const router = express.Router();
const vehicleController = makeVehicleController();

router.post('/create', vehicleController.create);

export default router;
