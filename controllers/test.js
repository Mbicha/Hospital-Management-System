import Test from "../models/test.js";
import handleAsync from "../utils/handleAsync.js";
import AppError from "../utils/appError.js";

const addTest = handleAsync(async (req, res, next) => {
    const newTest = await Test.create(req.body);

    return res.status(201).json({
        status: "success",
        data: {
            newTest
        }
    });
})

const getAllTests = handleAsync(async (req, res, next) => {
    const tests = await Test.find();

    if (!tests || tests.length === 0) {
        return next(new AppError("No tests found", 404));
    }

    return res.status(200).json({
        status: "success",
        num_tests: tests.length,
        data: {
            tests
        }
    })
})

const getTestById = handleAsync(async (req, res, next) => {
    const test = await Test.findById(req.params.id);

    if (!test) {
        return next(new AppError("No test found with that ID", 404));
    }

    return res.status(200).json({
        status: "success",
        data: {
            test
        }
    })
});

const updateTest = handleAsync(async (req, res, next) => {
    const test = await Test.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true,
        });
    if (!test) {
        return next(new AppError("No test found with that ID", 404));
    }
    return res.status(200).json({
        status: "success",
        data: {
            test
        }
    })
}
);

const deleteTest = handleAsync(async (req, res, next) => {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
        return next(new AppError("No test found with that ID", 404));
    }

    return res.status(204).json({
        status: "success",
        data: null
    })
});

const getTestsByDiseaseId = handleAsync(async (req, res, next) => {
    const tests = await Test.find({ disease_id: req.params.diseaseId });

    if (!tests || tests.length === 0) {
        return next(new AppError("No tests found for this disease", 404));
    }

    return res.status(200).json({
        status: "success",
        num_tests: tests.length,
        data: {
            tests
        }
    })
}
);

const getTestByType = handleAsync(async (req, res, next) => {
    const tests = await Test.find({ test_type: req.params.test_type });

    if (!tests || tests.length === 0) {
        return next(new AppError("No tests found with that type", 404));
    }

    return res.status(200).json({
        status: "success",
        num_tests: tests.length,
        data: {
            tests
        }
    })
}
);

export default {
    addTest,
    getAllTests,
    getTestById,
    updateTest,
    deleteTest,
    getTestsByDiseaseId,
    getTestByType,
};
