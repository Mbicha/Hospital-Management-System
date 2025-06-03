import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        max_length: 15,
        min_length: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    website: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;
