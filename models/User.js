const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  position: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", schema);
