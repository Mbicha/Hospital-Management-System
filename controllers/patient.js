import Patient from "../models/patient.js";
import handleAsync from "../utils/handleAsync.js";
import AppError from "../utils/appError.js";

const addPatient = handleAsync(async (req, res, next) => {
    const newPateint = await Patient.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newPateint
        },
    });
});

const getPatients = handleAsync(async (req, res, next) => {
    const patients = await Patient.find();
    if (!patients || patients.length === 0) {
        return next(new AppError("No patients found", 404));
    }

    res.status(200).json({
        status: "success",
        num_patients: patients.length,
        data: {
            patients
        },
    });
});

const getPatient = handleAsync(async (req, res, next) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
        return next(new AppError("No patient found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            patient
        },
    });
}
);

const updatePatient = handleAsync(async (req, res, next) => {
    const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true, runValidators: true,
        });
    if (!patient) {
        return next(new AppError("No patient found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            patient
        },
    });
});

const deletePatient = handleAsync(async (req, res, next) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
        return next(new AppError("No patient found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
})

const getPatientByState = handleAsync(async (req, res, next) => {   
    const patients = await Patient.find({ state: req.params.state });
    if (!patients || patients.length === 0) {
        return next(new AppError("No patients found with that state", 404));
    }

    res.status(200).json({
        status: "success",
        num_patients: patients.length,
        data: {
            patients
        },
    });
})

export default {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
    getPatientByState
}
