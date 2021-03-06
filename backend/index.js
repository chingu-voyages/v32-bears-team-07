const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const authenticationRoute = require("./src/routes/authentication");
const userFunctionsRoute = require("./src/routes/userFunctions");
const productRoutes = require("./src/routes/productRoutes");
const grapeJsRoutes = require("./src/routes/grapeJsRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const stripeRoutes = require("./src/routes/stripeRoutes");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());

//process.env.MONGODB_URI

mongoose
  .connect(process.env.MONGODB_URI, {
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
app.use("/api/productRoutes", productRoutes);
app.use("/api/grapeJsRoutes", grapeJsRoutes);
app.use("/api/cartRoutes", cartRoutes);
app.use("/api/stripeRoutes", stripeRoutes);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../frontend/build'));
// }

const folderName = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(folderName, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(folderName, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
