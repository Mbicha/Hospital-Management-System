import visit from "../controllers/visit.js";
import express from "express";
const router = express.Router();
const {
    addVisit,
    getAllVisits,
    getVisitById,
    updateVisit,
    deleteVisit,
    getVisitsByPatientId
} = visit;

router.route("/visit").post(addVisit).get(getAllVisits);
router
    .route("/visit/:id")
    .get(getVisitById)
    .patch(updateVisit)
    .delete(deleteVisit);
router.route("/visit/patient/:patientId").get(getVisitsByPatientId);

export default router;
