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
app.set("trust proxy", 1);
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.DB_URL, () => {
  console.log("MongoDB Connected");
});

app.use("/v1/auth", authRoute);
app.use("/v1/users", userRoute);
app.use("/v1/books", bookRoute);
app.use("/v1/orders", orderRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server listen on port", PORT);
});
module.exports = app;
