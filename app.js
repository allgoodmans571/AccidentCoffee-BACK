const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(
  "mongodb+srv://alex:password15326@dev.ffuml.mongodb.net/dev?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.post("/mng", (req, res) => {
  User.create({
    position: "Programmer",
    name: "Alex",
    email: "alex1@alex.com",
  });

  console.log("Saved");
});

app.post("/test", (req, res) => {
  User.findOne({ email: "maxim@max.com" }, "name email", function (err, user) {
    if (err) return console.error(err);
    try {
      console.log(user.name);
      res.send(user.name);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });
});

app.post("/registration", jsonParser, (req, res) => {
  body = req.body;
  User.create({
    position: body.position,
    name: body.name,
    email: body.email,
  })
    .then(() => {
      res.status(200);
      console.log("saved");
    })
    .catch((err) => {
      console.error(err);
      res.send({ status: 400 });
    });
});

app.listen(8080);
console.log("Сервер стартовал");
