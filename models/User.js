const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  image: { type: Buffer, contentType: String },
  telegram: { type: String },
  lifePos: { type: String },
  teamStatus: { type: String },
  wordPlace: { type: String },
  projectTime: { type: String },
  tags: { type: Array },
});

module.exports = mongoose.model("User", schema);
