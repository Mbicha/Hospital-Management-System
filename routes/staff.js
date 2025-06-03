import staff from "../controllers/staff.js";
import express from "express";
const router = express.Router();
const {
    addStaff,
    getStaffs,
    getStaff,
    updateStaff,
    deleteStaff,
    getStaffBySpecialization,
    getStaffByProffession
} = staff;

router.post("/staff", addStaff);
router.get("/staffs", getStaffs);
router.get("/staff/:id", getStaff);
router.patch("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);
router.get("/staff/specialization/:specialization", getStaffBySpecialization);
router.get("/staff/profession/:profession", getStaffByProffession);

export default router;
