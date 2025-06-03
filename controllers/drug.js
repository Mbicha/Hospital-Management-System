import Drug from '../models/drug.js';
import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';

const addDrug = handleAsync(async (req, res, next) => {
    const newDrug = await Drug.create(req.body);

    return res.status(201).json({
        status: 'success',
        message: 'Drug added successfully',
        data: {
            newDrug
        },
    });
});

const getAllDrugs = handleAsync(async (req, res, next) => {
    const drugs = await Drug.find();

    if (!drugs) {
        return next(new AppError('No drugs found', 404));
    }

    return res.status(200).json({
        status: 'success',
        num_drugs: drugs.length,
        data: {
            drugs
        }
    })
})

const getDrugById = handleAsync(async (req, res, next) => {
    const drug = await Drug.findById(req.params.id);

    if (!drug) {
        return next(new AppError('No drug found with that ID', 404));
    }

    return res.status(200).json({
        status: 'success',
        data: {
            drug
        }
    })
})

const updateDrug = handleAsync(async (req, res, next) => {
    const drug = await Drug.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!drug) {
        return next(new AppError('Drug not found', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'Drug updated successfully',
        data: {
            drug
        }
    })
});

const deleteDrug = handleAsync(async (req, res, next) => {

    const drug = await Drug.findByIdAndDelete(req.params.id);

    if (!drug) {
        return res.status(404).json({
            status: 'error',
            message: 'Drug not found'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: null
    })
})

export default {
    addDrug,
    getDrugById,
    getAllDrugs,
    updateDrug,
    deleteDrug
}
