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
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    photo: {
        type: String,
    },
    purpose: {
        type: String,
        required: [true, 'Purpose of visit is required'],
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
    },

    governmentId: {
        type: String,
        default: null
    },
    idLast4Digits: {
        type: String,
        required: [true, `Last 4 digits of ID are required`],
    },

    isApproved: {
        type: String,
        enum: ["Pending", "Yes", "No"],
        default: "Pending",
    },

    additionalNotes: {
        type: String,
        trim: true,
        maxlength: [200, 'Notes cannot exceed 200 characters']
    },

}, { timestamps: true });

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
