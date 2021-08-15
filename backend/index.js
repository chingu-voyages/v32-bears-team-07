const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const cors = require("cors");
const helmet = require('helmet');
const authenticationRoute = require("./src/routes/authentication");
const userFunctionsRoute = require("./src/routes/userFunctions");
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000

app.use(helmet())
// app.use(
//   cors({
//     origin: '*',
//   })
// );

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

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../frontend/build'));
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(PORT, () => {
  console.log("Backend is running.");
});
