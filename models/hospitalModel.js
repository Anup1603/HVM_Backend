const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hospitalSchema = new mongoose.Schema({

    hospitalName: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
    },

    hospitalEmail: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
    },

    phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    registrationNumber: {
        type: String,
        required: [true, "Registration Number is required"],
        unique: true,
    },

    address: {
        type: String,
        required: [true, "Address is required"],
    },

    qrCode: {
        type: String,
    }

}, { timestamps: true });


// hashing password
hospitalSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// compare password - decrypt password
hospitalSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;