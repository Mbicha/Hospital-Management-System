import mongoose from 'mongoose';

const SCANS = [
    "None",
    "X-Ray",
    "CT Scan",
    "MRI",
    "Ultrasound",
    "Mammography",
    "PET Scan",
    "Bone Density Scan",
    "Angiography",
    "Fluoroscopy",
    "Echocardiogram",
    "Doppler Ultrasound",
    "Endoscopy",
    "Colonoscopy",
    "Bronchoscopy",
    "EEG",
    "ECG/EKG",
    "Holter Monitor",
    "Stress Test",
    "Nuclear Medicine Scan",
    "IVP (Intravenous Pyelogram)",
    "Myelogram",
    "Arthrogram",
    "DEXA Scan",
    "Virtual Colonoscopy",
    "SPECT Scan",
    "Functional MRI (fMRI)",
    "Cardiac CT",
    "Coronary Angiogram",
    "Lumbar Puncture",
    "Cystoscopy"
]

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    test_type: {
        type: String,
        required: true,
        enum: ['blood', 'urine', 'imaging', 'biopsy'],
        default: 'blood'
    },
    scans: {
        type: [String],
        required: true,
        enum: SCANS,
        default: ['None'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'A test must have at least one scan.'
        }
    },
    test_cost: {
        type: Number,
        required: true,
        min: 0
    },
    test_date: {
        type: Date,
        required: true
    },
    results: {
        type: [String],
        enum: ['positive', 'negative', 'inconclusive'],
        default: 'negative',
        required: true,
        trim: true
    },
    disease_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Test = mongoose.model('Test', testSchema);
export default Test;
