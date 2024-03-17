import express from 'express';
import { makeDriverController } from '../factories/driver';

const router = express.Router();

router.post('/create', makeDriverController().create);

export default router;
