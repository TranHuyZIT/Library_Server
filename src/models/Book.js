const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  // Store timestamp when users create or update something
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", BookSchema);
