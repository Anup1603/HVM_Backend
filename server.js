const express = require("express");
const cors = require("cors");
const visitorRouter = require("./routes/visitorRoute");
const hospitalRouter = require("./routes/hospitalRoute");
const connectDB = require("./db/connectDB");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Server Started successfully...</h1>");
})

// Routes
app.use('/api/visitors', visitorRouter);
app.use('/api/hospital', hospitalRouter);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server connected successfully @ http://localhost:${PORT}/api/hospital`);
        });
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }
};

startServer();