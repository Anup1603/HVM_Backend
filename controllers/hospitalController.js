const Hospital = require("../models/hospitalModel");
const generateToken = require("../utils/generateToken");
const QRCode = require("qrcode");
require("dotenv").config();

// Register a new hospital
const registerHospital = async (req, res) => {
    const { hospitalName, hospitalEmail, phoneNumber, password, registrationNumber, address } = req.body;

    try {
        // Check if hospital already exists
        const hospitalExists = await Hospital.findOne({ hospitalEmail });
        if (hospitalExists) {
            return res.status(400).json({ message: "Hospital already exists" });
        }

        // Create new hospital
        const hospital = await Hospital.create({
            hospitalName,
            hospitalEmail,
            phoneNumber,
            password,
            registrationNumber,
            address,
        });

        if (hospital) {
            // Generate QR code data containing only the formUrl
            const formUrl = `${process.env.BASE_URL}${hospital._id}`;
            const qrCode = await QRCode.toDataURL(formUrl);

            // Save QR code in the hospital document
            hospital.qrCode = qrCode;
            await hospital.save();

            // Return the QR code as an image
            const base64Data = qrCode.split(",")[1];
            const imgBuffer = Buffer.from(base64Data, "base64");

            // res.status(201).json({
            //     _id: hospital._id,
            //     hospitalName: hospital.hospitalName,
            //     hospitalEmail: hospital.hospitalEmail,
            //     phoneNumber: hospital.phoneNumber,
            //     registrationNumber: hospital.registrationNumber,
            //     address: hospital.address,
            //     qrCode: hospital.qrCode,
            //     token: generateToken(hospital._id),
            // });

            res.set("Content-Type", "image/png");
            return res.status(200).send(imgBuffer);
        } else {
            res.status(400).json({ message: "Invalid hospital data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hospital login
const loginHospital = async (req, res) => {
    const { hospitalEmail, password } = req.body;

    try {
        const hospital = await Hospital.findOne({ hospitalEmail });

        if (hospital && (await hospital.matchPassword(password))) {
            res.json({
                _id: hospital._id,
                hospitalName: hospital.hospitalName,
                hospitalEmail: hospital.hospitalEmail,
                phoneNumber: hospital.phoneNumber,
                registrationNumber: hospital.registrationNumber,
                address: hospital.address,
                token: generateToken(hospital._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update hospital profile
const updateHospital = async (req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById({ _id: id });

        if (hospital) {
            hospital.hospitalName = req.body.hospitalName || hospital.hospitalName;
            hospital.hospitalEmail = req.body.hospitalEmail || hospital.hospitalEmail;
            hospital.phoneNumber = req.body.phoneNumber || hospital.phoneNumber;
            hospital.registrationNumber = req.body.registrationNumber || hospital.registrationNumber;
            hospital.address = req.body.address || hospital.address;

            if (req.body.password) {
                hospital.password = req.body.password;
            }

            const updatedHospital = await hospital.save();

            res.json({
                _id: updatedHospital._id,
                hospitalName: updatedHospital.hospitalName,
                hospitalEmail: updatedHospital.hospitalEmail,
                phoneNumber: updatedHospital.phoneNumber,
                registrationNumber: updatedHospital.registrationNumber,
                address: updatedHospital.address,
                token: generateToken(updatedHospital._id),
            });
        } else {
            res.status(404).json({ message: "Hospital not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all hospitals
const getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({});
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get hospital by ID
const getHospitalById = async (req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById({ _id: id });

        if (hospital) {
            res.json(hospital);
        } else {
            res.status(404).json({ message: "Hospital not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete hospital
const deleteHospital = async (req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById({ _id: id });

        if (hospital) {
            await hospital.remove();
            res.json({ message: "Hospital removed" });
        } else {
            res.status(404).json({ message: "Hospital not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerHospital, loginHospital, updateHospital, getHospitals, getHospitalById, deleteHospital };