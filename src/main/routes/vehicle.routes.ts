import express from 'express';
import { makeVehicleController } from '../factories/vehicle';

const router = express.Router();
const vehicleController = makeVehicleController();

router.post('/create', vehicleController.create);
router.get('/all', vehicleController.getVehicles);
router.get('/:vehicleId', vehicleController.getById);
router.put('/:vehicleId', vehicleController.update);

export default router;
