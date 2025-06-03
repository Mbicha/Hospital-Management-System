import Payment from "../models/payment.js";
import AppError from "../utils/appError.js";
import handleAsync from "../utils/handleAsync.js";

const addPayment = handleAsync(async (req, res, next) => {

    const payment = await Payment.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            payment
        },
    });
})

const getAllPayments = handleAsync(async (req, res, next) => {
    const payments = await Payment.find().populate("visit_id");

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});


const getPaymentById = handleAsync(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id).populate("visit_id");

    if (!payment) {
        return next(new AppError("No payment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payment
        },
    });
});

const updatePayment = handleAsync(async (req, res, next) => {

    const payment = await Payment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!payment) {
        return next(new AppError("No payment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payment
        },
    });
});
const deletePayment = handleAsync(async (req, res, next) => {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
        return next(new AppError("No payment found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

// An Error
const getPaymentsByVisitId = handleAsync(async (req, res, next) => {
    const payments = await Payment.find({ visit_id: req.params.visit_id }).populate("visit_id");

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this visit", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByMethod = handleAsync(async (req, res, next) => {
    const payments = await Payment.find({ method: req.params.method });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found with this method", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByStatus = handleAsync(async (req, res, next) => {
    const payments = await Payment.find({ status: req.params.status });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found with this status", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByDate = handleAsync(async (req, res, next) => {
    const { startDate, endDate } = req.params;

    // Validate dates
    if (!startDate || !endDate) {
        return next(new AppError("Please provide both start and end dates", 400));
    }

    // Parse dates and adjust for full-day range
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate parsed dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return next(new AppError("Invalid date format. Use YYYY-MM-DD", 400));
    }

    end.setHours(23, 59, 59, 999);

    const payments = await Payment.find({
        createdAt: {
            $gte: start,
            $lte: end,
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments,
        },
    });
});

const getPaymentsByAmountRange = handleAsync(async (req, res, next) => {
    const { minAmount, maxAmount } = req.query;

    const payments = await Payment.find({
        amount: {
            $gte: minAmount,
            $lte: maxAmount,
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found in this amount range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByStatusAndDate = handleAsync(async (req, res, next) => {
    const { status } = req.params;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        status,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found with this status in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByMethodAndDate = handleAsync(async (req, res, next) => {
    const { method } = req.params;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        method,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found with this method in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByStatusAndMethod = handleAsync(async (req, res, next) => {
    const { status } = req.params;
    const { method } = req.query;

    const payments = await Payment.find({
        status,
        method,
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found with this status and method", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndDate = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        patient_id,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndMethod = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { method } = req.query;

    const payments = await Payment.find({
        patient_id,
        method,
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this method", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndStatus = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { status } = req.query;

    const payments = await Payment.find({
        patient_id,
        status,
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this status", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndStatusAndDate = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { status } = req.query;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        patient_id,
        status,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this status in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndMethodAndDate = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { method } = req.query;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        patient_id,
        method,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this method in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getMonthlyPayments = handleAsync(async (req, res, next) => {
    const { year, month } = req.params;

    const payments = await Payment.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-${month}-01`),
                    $lt: new Date(`${year}-${month + 1}-01`),
                },
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalPayments: { $sum: 1 },
            },
        },
    ]);

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this month", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payments
        },
    });
});

const getYearlyPayments = handleAsync(async (req, res, next) => {
    const { year } = req.params;

    const payments = await Payment.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lt: new Date(`${year + 1}-01-01`),
                },
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalPayments: { $sum: 1 },
            },
        },
    ]);

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this year", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payments
        },
    });
});

const getDailyPayments = handleAsync(async (req, res, next) => {
    const { date } = req.params;

    const payments = await Payment.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${date}T00:00:00Z`),
                    $lt: new Date(`${date}T23:59:59Z`),
                },
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalPayments: { $sum: 1 },
            },
        },
    ]);

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this date", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payments
        },
    });
});

const getWeeklyPayments = handleAsync(async (req, res, next) => {
    const { startDate, endDate } = req.query;

    const payments = await Payment.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                },
            },
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalPayments: { $sum: 1 },
            },
        },
    ]);

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this week", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndStatusAndMethod = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { status } = req.query;
    const { method } = req.query;

    const payments = await Payment.find({
        patient_id,
        status,
        method,
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this status and method", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

const getPaymentsByPatientIdAndStatusAndMethodAndDate = handleAsync(async (req, res, next) => {
    const { patient_id } = req.params;
    const { status } = req.query;
    const { method } = req.query;
    const { startDate, endDate } = req.query;

    const payments = await Payment.find({
        patient_id,
        status,
        method,
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    });

    if (!payments || payments.length === 0) {
        return next(new AppError("No payments found for this patient with this status and method in this date range", 404));
    }

    res.status(200).json({
        status: "success",
        results: payments.length,
        data: {
            payments
        },
    });
});

export default {
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
};
