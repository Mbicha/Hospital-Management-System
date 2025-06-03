import express from 'express';
const router = express.Router();

import Hospital from '../controllers/hospital.js';

router.post('/hospital', Hospital.addHospital);
router.get('/hospital/:id', Hospital.getHospitalById);
router.get('/hospitals', Hospital.getAllHospitals);
router.patch('/hospital/:id', Hospital.updateHospital);
router.delete('/hospital/:id', Hospital.deleteHospital);

export default router;
