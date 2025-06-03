import express from "express";
import Drug from "../controllers/drug.js";

const router = express.Router();

router.post("/drug", Drug.addDrug);
router.get("/drugs", Drug.getAllDrugs);
router.get("/drug/:id", Drug.getDrugById);
router.patch("/drug/:id", Drug.updateDrug);
router.delete("/drug/:id", Drug.deleteDrug);

export default router;
