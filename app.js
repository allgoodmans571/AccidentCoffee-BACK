const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

mongoose.connect(
  "mongodb+srv://alex:password15326@dev.ffuml.mongodb.net/dev?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.get("/mng", (req, res) => {
  let usr = new User({
    position: "Programmer",
    name: "Alex",
    email: "alex1@alex.com",
  });
  try {
    usr.save();
  } catch (error) {
    console.error(error);
  }
  console.log("Saved");
});

app.get("/test", (req, res) => {
  User.findOne({ email: "maxim@max.com" }, "name email", function (err, user) {
    if (err) return console.error(err);
    try {
      console.log(user.name);
    } catch (err) {
      console.error(err);
    }
  });
});

app.listen(8080);
console.log("Сервер стартовал");
