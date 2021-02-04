const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  image: { type: String },
  telegram: { type: String },
});

module.exports = mongoose.model("User", schema);
