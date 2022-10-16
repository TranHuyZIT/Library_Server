const mongoose = require("mongoose");
const OrderDetailSchema = new mongoose.Schema({
  orderID: {
    required: true,
    type: String,
  },
  bookID: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
