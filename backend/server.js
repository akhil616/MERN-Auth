require("dotenv").config();

const cors = require("cors");
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//route
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));