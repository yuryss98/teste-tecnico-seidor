import express from 'express';
import { makeVehicleUtilizationController } from '../factories/vehicle-utilization';

const router = express.Router();
const vehicleUtilizationController = makeVehicleUtilizationController();

router.post('/create', vehicleUtilizationController.create);

export default router;
