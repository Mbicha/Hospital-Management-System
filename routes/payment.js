import payment from "../controllers/payment.js";
import express from "express";
const router = express.Router();
const {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
    getPaymentsByVisitId,
    getPaymentsByMethod,
    getPaymentsByStatus,
    getPaymentsByDate,
    getPaymentsByAmountRange,
    getPaymentsByStatusAndDate,
    getPaymentsByMethodAndDate,
    getPaymentsByStatusAndMethod,
    getPaymentsByPatientIdAndDate,
    getPaymentsByPatientIdAndMethod,
    getPaymentsByPatientIdAndStatus,
    getPaymentsByPatientIdAndStatusAndDate,
    getPaymentsByPatientIdAndMethodAndDate,
    getMonthlyPayments,
    getYearlyPayments,
    getDailyPayments,
    getWeeklyPayments,
} = payment;

router.route("/payment").post(addPayment).get(getAllPayments);
router
    .route("/payment/:id")
    .get(getPaymentById)
    .patch(updatePayment)
    .delete(deletePayment);
router.route("/payment/visit/:visitId").get(getPaymentsByVisitId);
router.route("/payment/method/:method").get(getPaymentsByMethod);
router.route("/payment/status/:status").get(getPaymentsByStatus);
router.route("/payment/date/:startDate/:endDate").get(getPaymentsByDate);
router.route("/payment/amount/:minAmount/:maxAmount").get(getPaymentsByAmountRange);
router.route("/payment/status/:status/date/:date").get(getPaymentsByStatusAndDate);
router.route("/payment/method/:method/date/:date").get(getPaymentsByMethodAndDate);
router.route("/payment/status/:status/method/:method").get(getPaymentsByStatusAndMethod);
router.route("/payment/patient/:patientId/date/:date").get(getPaymentsByPatientIdAndDate);
router.route("/payment/patient/:patientId/method/:method").get(getPaymentsByPatientIdAndMethod);
router.route("/payment/patient/:patientId/status/:status").get(getPaymentsByPatientIdAndStatus);
router.route("/payment/patient/:patientId/status/:status/date/:date").get(getPaymentsByPatientIdAndStatusAndDate);
router.route("/payment/patient/:patientId/method/:method/date/:date").get(getPaymentsByPatientIdAndMethodAndDate);
router.route("/payment/amount/monthly").get(getMonthlyPayments);
router.route("/payment/amount/yearly").get(getYearlyPayments);
router.route("/payment/amount/daily").get(getDailyPayments);
router.route("/payment/amount/weekly").get(getWeeklyPayments);

export default router;
