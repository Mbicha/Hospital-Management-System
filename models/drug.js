import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    side_effects: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'A drug must have at least one side effect.'
        }
    },
    manufactured_by: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    expiration_date: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                return v > new Date();
            },
            message: 'Expiration date must be in the future.'
        }
    },
    buying_price: {
        type: Number,
        required: true,
        min: 0
    },
    selling_price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit_of_measure: {
        type: String,
        required: true,
        enum: ['mg', 'g', 'ml', 'L', 'units'],
        default: 'mg'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const Drug = mongoose.model('Drug', drugSchema);
export default Drug;
