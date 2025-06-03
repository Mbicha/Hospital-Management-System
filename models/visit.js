import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'Patient',
        required: true
    },
    staff_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Staff',
        required: true,
        default: []
    },
    test_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Test',
        required: true,
        default: []
    },
    drug_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drug',
        required: true,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Visit = mongoose.model('Visit', visitSchema);
export default Visit;
