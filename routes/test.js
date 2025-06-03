import test from "../controllers/test.js";
import express from "express";
const router = express.Router();
const {
    addTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest,
    getTestsByDiseaseId,
    getTestByType
} = test;


router.route("/test").post(addTest).get(getAllTests);
router
    .route("/test/:id")
    .get(getTestById)
    .patch(updateTest)
    .delete(deleteTest);
router.route("/test/disease/:diseaseId").get(getTestsByDiseaseId);
router.route("/test/type/:test_type").get(getTestByType);

export default router;
