const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const jsonParser = bodyParser.json();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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

app.post("/test", jsonParser, (req, res) => {
  User.findOne(
    { email: req.body.key },
    "name position email image telegram",
    function (err, user) {
      if (err) return console.error(err);
      try {
        console.log(
          user.name,
          user.position,
          user.email,
          user.image,
          user.telegram
        );
        console.log(user);
        res.send(user);
      } catch (err) {
        console.error(err);
        res.send(err);
      }
    }
  );
});

app.post("/registration", jsonParser, (req, res) => {
  body = req.body;
  User.create({
    name: body.name,
    position: body.position,
    email: body.email,
    image: body.image,
    telegram: body.telegram,
  })
    .then(() => {
      res.sendStatus(200);
      console.log("saved");
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

app.listen(8080);
console.log("Сервер стартовал");
