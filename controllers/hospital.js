import Hospital from '../models/hospital.js';
import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';

const addHospital = handleAsync(async (req, res, next) => {
    const newHospital = await Hospital.create(req.body);

    return res.status(201).json({
        status: 'success',
        data: {
            newHospital,
        }
    });
})

const getAllHospitals = handleAsync(async (req, res, next) => {
    const hospitals = await Hospital.find();

    if (!hospitals || hospitals.length === 0) {
        return next(new AppError('No hospitals found', 404));
    }

    return res.status(200).json({
        status: 'success',
        num_hospitals: hospitals.length,
        data: {
            hospitals
        }
    })
})

const getHospitalById = handleAsync(async (req, res, next) => {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
        return next(new AppError('No hospital found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            hospital
        }
    })
});

const updateHospital = handleAsync(async (req, res, next) => {
    const hospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true
        });

    if (!hospital) {
        return next(new AppError('No hospital found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            hospital
        }
    })
});

const deleteHospital = handleAsync(async (req, res, next) => {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
        return next(new AppError('No hospital found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: null
    })
});

export default
    {
        addHospital,
        getAllHospitals,
        getHospitalById,
        updateHospital,
        deleteHospital
    }
