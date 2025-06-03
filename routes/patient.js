import patient from "../controllers/patient.js";
import express from "express";
const router = express.Router();

router.post("/patient", patient.addPatient);
router.get("/patients", patient.getPatients);
router.get("/patient/:id", patient.getPatient);
router.patch("/patient/:id", patient.updatePatient);
router.delete("/patient/:id", patient.deletePatient);
router.get("/patients/by-state/:state", patient.getPatientByState);

export default router;
