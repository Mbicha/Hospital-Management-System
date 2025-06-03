import Staff from '../models/staff.js';
import handleAsync from '../utils/handleAsync.js';
import AppError from '../utils/appError.js';

const addStaff= handleAsync(async (req, res, next) => {
    const newStaff = await Staff.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newStaff
        },
    });
})

const getStaffs = handleAsync(async (req, res, next) => {
    const staffs = await Staff.find().populate('user_id', 'email');
    if (!staffs || staffs.length === 0) {
        return next(new AppError('No staffs found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: staffs.length,
        data: {
            staffs,
        },
    });
})

const getStaff = handleAsync(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id).populate('user_id', 'email');
    if (!staff) {
        return next(new AppError('No staff found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            staff,
        },
    });
})

const updateStaff = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    

    const staff = await Staff.findByIdAndUpdate(
        id,
        { $set: req.body },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!staff) {
        return next(new AppError('No staff found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            staff,
        },
    });
})

const deleteStaff = handleAsync(async (req, res, next) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
        return next(new AppError('No staff found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
})

const getStaffBySpecialization = handleAsync(async (req, res, next) => {
    const staff = await Staff.find({ field_of_specialization: req.params.specialization });
    if (!staff || staff.length === 0) {
        return next(new AppError('No staff found with that specialization', 404));
    }

    res.status(200).json({
        status: 'success',
        results: staff.length,
        data: {
            staff,
        },
    });
})

const getStaffByProffession = handleAsync(async (req, res, next) => {
    const staff = await Staff.find({ profession: req.params.profession });
    if (!staff || staff.length === 0) {
        return next(new AppError('No staff found with that profession', 404));
    }

    res.status(200).json({
        status: 'success',
        results: staff.length,
        data: {
            staff,
        },
    });
})

export default {
    addStaff,
    getStaffs,
    getStaff,
    updateStaff,
    deleteStaff,
    getStaffBySpecialization,
    getStaffByProffession,
}
