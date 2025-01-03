const Visitor = require('../models/visitorModel');
const Hospital = require('../models/hospitalModel');

// Create a new visitor
const createVisitor = async (req, res) => {
    const { hospitalId } = req.params;

    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        const visitor = await Visitor.create({ ...req.body, hospital: hospitalId });
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all visitors for a specific hospital
const getAllVisitors = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const visitors = await Visitor.find({ hospital: hospitalId });
        res.status(200).json(visitors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching visitors" });
    }
};

// Get a single visitor by ID for a specific hospital
const getSingleVisitor = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findOne({ _id: id, hospital: req.hospital._id });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a visitor by ID for a specific hospital
const updateVisitor = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findOneAndUpdate(
            { _id: id, hospital: req.hospital._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a visitor by ID for a specific hospital
const deleteVisitor = async (req, res) => {
    const { id } = req.params;

    try {
        const visitor = await Visitor.findOneAndDelete({ _id: id, hospital: req.hospital._id });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TODO: Delete all visitors for a specific hospital (Testing purposes)
const deleteAllVisitors = async (req, res) => {
    const { hospitalId } = req.params;

    try {
        await Visitor.deleteMany({ hospital: hospitalId });
        res.status(200).json({ message: 'All visitors deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TODO: Add multiple visitors at a time for a specific hospital (Testing purposes)
const addManyVisitors = async (req, res) => {
    const { hospitalId } = req.params;

    try {
        const visitors = await Visitor.insertMany(
            req.body.map(visitor => ({ ...visitor, hospital: hospitalId }))
        );
        res.status(201).json(visitors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createVisitor,
    getAllVisitors,
    getSingleVisitor,
    updateVisitor,
    deleteVisitor,
    deleteAllVisitors,
    addManyVisitors,
};
