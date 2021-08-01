const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authenticationRoute = require("./src/routes/authentication");
const userFunctionsRoute = require("./src/routes/userFunctions");

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // Line below tells mongoose to use MongoDb driver's findOneAndUpdate() instead of the legacy version that will be removed after Mongoose 6.0
    useFindAndModify: false,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authenticationRoute);
app.use("/api/userFunctions", userFunctionsRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});