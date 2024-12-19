const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    contact: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    photo: {
        type: String,
    },
    purpose: {
        type: String,
        required: [true, 'Purpose of visit is required'],
        enum: ['Meeting a Patient', 'Vendor/Delivery', 'Maintenance/Repairs', 'Official Meeting with Staff', "Other"],
        default: 'Other'
    },
    otherPurpose: {
        type: String,
        trim: true,
        default: null,
    },

    visitPersonOrDepartment: {
        type: String,
        required: [true, 'Visit Person/Department is required'],
        trim: true,
    },

    expectedDuration: {
        type: String,
        required: [true, 'Purpose of visit is required'],
        enum: ['Less than 30 minutes', '30 minutes to 1 hour', '1-2 hours', 'More than 2 hours', "Other"],
    },

    governmentId: {
        type: String,
        enum: ['Aadhar Card', 'PAN Card', 'Driving License', 'Passport', "Voter ID", "Other"],
        default: null
    },
    idLast4Digits: {
        type: String,
        required: [true, `Last 4 digits of ID are required`],
        match: [/^\d{4}$/, 'ID must have exactly 4 digits'],
    },

    visitDate: {
        type: Date,
        default: Date.now
    },

    isApproved: {
        type: Boolean,
        default: false
    },
    additionalNotes: {
        type: String,
        trim: true,
        maxlength: [200, 'Notes cannot exceed 200 characters']
    },

}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
