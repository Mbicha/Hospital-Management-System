import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    insurance_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    insurance_number: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 15
    },
    existing_conditions: {
        type: [String],
        required: true,
        default: [],
    },
    blood_group: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        default: 'O+'
    },
    allergies: {
        type: [String],
        required: true,
        default: ['None'],
    },
    state: {
        type: String,
        required: true,
        enum: ['Reporting (Dormant)', 'Received', 'Consultation', 'Diagnosis',
            'Approving', 'Interpretation', 'Admitted', 'Drugging', 'Discharging', 'Discharged'],
        default: 'Reporting (Dormant)'
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
