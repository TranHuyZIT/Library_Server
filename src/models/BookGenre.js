const mongoose = require("mongoose");

const BookGenreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("BookGenre", BookGenreSchema);
