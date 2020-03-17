const mongoose = require("mongoose");

const TextSchema = mongoose.Schema({
  text: {
    type: String
  }
});

module.exports = mongoose.model("text", TextSchema);
