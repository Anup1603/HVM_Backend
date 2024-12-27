// routes/visitorRoutes.js
const express = require('express');
const Visitor = require('../models/visitorModel');

const visitorRouter = express.Router();

// Create a new visitor
visitorRouter.post('/', async (req, res) => {
    try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all visitors
visitorRouter.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single visitor by ID
visitorRouter.get('/:id', async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a visitor by ID
visitorRouter.put('/:id', async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
        res.status(200).json(visitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a visitor by ID
visitorRouter.delete('/:id', async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
        res.status(200).json({ message: 'Visitor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete all data TODO: Just for (Testing Purposes)
visitorRouter.delete('/', async (req, res) => {
    try {
        await Visitor.deleteMany();
        res.status(200).json({ message: 'All visitors deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// TODO: Add multipal visitor at a time (Testing purpose)
visitorRouter.post('/addMany', async (req, res) => {
    try {
        const visitors = await Visitor.insertMany(req.body);
        res.status(201).json(visitors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = visitorRouter;