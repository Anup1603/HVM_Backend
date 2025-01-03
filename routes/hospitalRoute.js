const express = require("express");
const {
    registerHospital, loginHospital, updateHospital, getHospitals, getHospitalById, deleteHospital
} = require("../controllers/hospitalController");

const hospitalRouter = express.Router();

hospitalRouter.route("/register").post(registerHospital);

hospitalRouter.route("/login").post(loginHospital);

hospitalRouter.route("/:id").put(updateHospital);

hospitalRouter.route("/").get(getHospitals);

hospitalRouter.route("/:id").get(getHospitalById);

hospitalRouter.route("/:id").delete(deleteHospital);

module.exports = hospitalRouter;
