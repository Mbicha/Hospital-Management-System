import Disease from '../models/disease.js';
import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';

const addDisease = handleAsync(async (req, res, next) => {

    const disease = await Disease.create(req.body);

    return res.status(201).json({
        status: 'success',
        data: {
            disease
        },
    });

})

const getAllDiseases = handleAsync(async (req, res, next) => {

    const diseases = await Disease.find();

    if (!diseases || diseases.length === 0) {
        return next(new AppError('No diseases found', 404));
    }

    return res.status(200).json({
        status: 'success',
        num_diseases: diseases.length,
        data: {
            diseases
        }
    });
})

const getDiseaseById = handleAsync(async (req, res, next) => {
    const disease = await Disease.findById(req.params.id);

    if (!disease) {
        return next(new AppError('No disease found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            disease
        }
    });
})

const getDiseaseByName = handleAsync(async (req, res, next) => {
    const disease = await Disease.findOne({ name: req.params.name });

    if (!disease) {
        return next(new AppError('No disease found with that name', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            disease
        }
    });
})

const getDiseaseByType = handleAsync(async (req, res, next) => {
    const diseases = await Disease.find({ type_of_disease: req.params.type_of_disease });

    if (!diseases || diseases.length === 0) {
        return next(new AppError('No disease found with that type', 404));
    }

    return res.status(200).json({
        status: 'success',
        num_diseases: diseases.length,
        data: {
            diseases
        }
    });
});

const getDiseasesByContagiousStatus = handleAsync(async (req, res, next) => {
    const diseases = await Disease.find({ contagious: req.params.contagius });

    if (!diseases || diseases.length === 0) {
        return next(new AppError('No diseases found with that contagious status', 404));
    }

    return res.status(200).json({
        status: 'success',
        num_diseases: diseases.length,
        data:{
            diseases
        }
    });
})

const updateDisease = handleAsync(async (req, res, next) => {
    const disease = await Disease.findByIdAndUpdate(
        req.params.id, 
        { $set: req.body}, 
        {
            new: true,
            runValidators: true,
       });

    if (!disease) {
        return next(new AppError('Disease not found', 404));
    }

    return res.status(200).json({
        status: 'success',
        data:{
            disease
        },
    });
}
)

const deleteDisease = handleAsync(async (req, res, next) => {
    const disease = await Disease.findByIdAndDelete(req.params.id);

    if (!disease) {
        return next(new AppError('Disease not found', 404));
    }

    return res.status(204).json({
        status: 'success',
        data: null,
    });

})

export default {
    addDisease,
    getAllDiseases,
    getDiseaseById,
    getDiseaseByName,
    getDiseaseByType,
    getDiseasesByContagiousStatus,
    updateDisease,
    deleteDisease
}
