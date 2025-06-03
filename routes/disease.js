import disease from "../controllers/disease.js";
import express from "express";
const router = express.Router();

router.post("/disease", disease.addDisease);
router.get("/diseases", disease.getAllDiseases);
router.get("/disease/:id", disease.getDiseaseById);
router.get("/disease/name/:name", disease.getDiseaseByName);
router.get("/disease/type_of_disease/:type_of_disease", disease.getDiseaseByType);
router.get("/disease/contagious/:contagious", disease.getDiseasesByContagiousStatus);
router.patch("/disease/:id", disease.updateDisease);
router.delete("/disease/:id", disease.deleteDisease);

export default router;
