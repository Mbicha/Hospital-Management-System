import mongoose from 'mongoose';

const profession = ['Doctor', 'Receptionist', 'Nurse', 'Lab Technician', 'Admin'];
const level_of_education = ['High School', 'Bachelor', 'Master', 'Doctorate'];
const list_of_universities = ['Harvard', 'Stanford', 'MIT', 'Yale', 'Princeton', 'Maseno University', 'University of Nairobi', 'University of Eldoret', 'University of Kisii', 'University of Mombasa'];
const field_of_specialization = [
    "Software Engineer",
    'Allergy and Immunology',
    'Anesthesiology',
    'Cardiology',
    'Cardiothoracic Surgery',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    "General Practice",
    'General Surgery',
    'Geriatrics',
    'Hematology',
    'Infectious Disease',
    'Internal Medicine',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Obstetrics and Gynecology (OB/GYN)',
    'Oncology',
    'Ophthalmology',
    'Orthopedic Surgery',
    'Otolaryngology (ENT)',
    'Pathology',
    'Pediatrics',
    'Physical Medicine and Rehabilitation',
    'Plastic Surgery',
    'Psychiatry',
    'Pulmonary Medicine',
    'Radiology',
    'Rheumatology',
    'Urology',
    'Vascular Surgery',
    'Addiction Medicine',
    'Adolescent Medicine',
    'Bariatric Medicine',
    'Clinical Genetics',
    'Critical Care Medicine',
    'Forensic Pathology',
    'Hospice and Palliative Medicine',
    'Interventional Radiology',
    'Maternal-Fetal Medicine',
    'Medical Toxicology',
    'Neonatology',
    'Nuclear Medicine',
    'Pain Medicine',
    'Pediatric Cardiology',
    'Sleep Medicine',
    'Sports Medicine',
    'Transplant Surgery',
    'Trauma Surgery'
  ];

const staffSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true,
    },
    profession: {
        type: String,
        enum: profession,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
        default: 0.00,
    },
    years_of_experience: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    level_of_education: {
        type: String,
        enum: level_of_education,
        required: true,
        trim: true,
    },
    education: {
        type: String,
        enum: list_of_universities,
        required: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
    },
    medical_condition: {
        type: String,
        required: true,
        trim: true,
        default: 'None',
    },
    field_of_specialization: {
        type: String,
        enum: field_of_specialization,
        required: true,
        trim: true,
    },
    hospital_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    },
    on_duty: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
