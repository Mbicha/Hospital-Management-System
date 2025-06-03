import Visit from "../models/visit.js";
import AppError from "../utils/appError.js";
import handleAsync from "../utils/handleAsync.js";

const addVisit = handleAsync(async (req, res, next) => {

    const visit = await Visit.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            visit
        }
    });
}
);

const getAllVisits = handleAsync(async (req, res, next) => {
    const visits = await Visit.find();

    if (!visits || visits.length === 0) {
        return next(new AppError("No medical histories found", 404));
    }

    res.status(200).json({
        status: "success",
        results: visits.length,
        data: {
            visits
        }
    });
}
);

const getVisitById = handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const visit = await Visit.findById(id)

    if (!visit) {
        return next(new AppError("No medical history found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            visit
        }
    });
}
);

const updateVisit = handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const visit = await Visit.findByIdAndUpdate(id,
        {$set: req.body},
        { new: true, runValidators: true});

    if (!visit) {
        return next(new AppError("No medical history found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            visit
        }
    });
});

const deleteVisit = handleAsync(async (req, res, next) => {
    const { id } = req.params;

    const visit = await Visit.findByIdAndDelete(id);
    if (!visit) {
        return next(new AppError("No medical history found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null
    });
}
);

const getVisitsByPatientId = handleAsync(async (req, res, next) => {
    const { patientId } = req.params;

    const visits = await Visit.find({ patient_id: patientId })
        .populate("patient_id")
        .populate("staff_ids")
        .populate("test_ids")
        .populate("drug_ids");

    if (!visits || visits.length === 0) {
        return next(new AppError("No medical histories found for this patient", 404));
    }

    res.status(200).json({
        status: "success",
        results: visits.length,
        data: {
            visits
        }
    });
}
);

export default {
    addVisit,
    getAllVisits,
    getVisitById,
    updateVisit,
    deleteVisit,
    getVisitsByPatientId
};
