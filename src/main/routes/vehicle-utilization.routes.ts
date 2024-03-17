import express from 'express';
import { makeVehicleUtilizationController } from '../factories/vehicle-utilization';

const router = express.Router();
const vehicleUtilizationController = makeVehicleUtilizationController();

router.post('/create', vehicleUtilizationController.create);
router.get('/all', vehicleUtilizationController.getVehiclesUtilization);
router.put('/:vehicleUtilizationId', vehicleUtilizationController.finish);

export default router;
