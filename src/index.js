const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const orderRoute = require("./routes/order");
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.DB_URL, () => {
  console.log("MongoDB Connected");
});
// Routes
app.use("/v1/auth", authRoute);
app.use("/v1/users", userRoute);
app.use("/v1/books", bookRoute);
app.use("/v1/orders", orderRoute);

app.listen(5000, () => {
  console.log("Server listen on port", 5000);
});
module.exports = app;
