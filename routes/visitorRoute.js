const express = require('express');
// const auth = require('../middleware/auth');
const {
    createVisitor,
    getAllVisitors,
    getSingleVisitor,
    updateVisitor,
    deleteVisitor,
    deleteAllVisitors,
    addManyVisitors
} = require('../controllers/visitorController');

const visitorRouter = express.Router();

visitorRouter.route("/:hospitalId").post(createVisitor);

visitorRouter.route("/:hospitalId").get(getAllVisitors);

visitorRouter.route("/:hospitalId/:id").get(getSingleVisitor);

visitorRouter.route("/:hospitalId/:id").put(updateVisitor);

visitorRouter.route("/:hospitalId/:id").delete(deleteVisitor);

// TODO: Delete all visitors for the nticated hospital (Testing purposes)
visitorRouter.route("/").delete(deleteAllVisitors);

// TODO: Add multiple visitors at a time (Testing purposes)
visitorRouter.route("/addMany").post(addManyVisitors);

module.exports = visitorRouter;
