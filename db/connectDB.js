const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log(`Database connected successfully`);
    }).catch((err) => {
        console.log(`DB not connected : ${err.message}`);
    })
}

module.exports = connectDB;