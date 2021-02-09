const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const { json } = require("body-parser");

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

app.post("/getMatch", jsonParser, async (req, res) => {
  let names = [];
  let name = req.body.name;
  // console.log(name);

  let query = await User.findOne({ name }, "tags", (err, query) => {
    return query;
  });
  let key = query.tags;
  console.log(key);

  let allData = await User.find(
    {},
    "name position email telegram lifePos teamStatus wordPlace projectTime tags"
  );

  for (let i = 0; i < allData.length; i++) {
    findTags(key, allData[i]);
  }

  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function findTags(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2["tags"].length; j++) {
        if ((array1[i] = array2["tags"][j])) {
          if (names.indexOf(array2.name) === -1) {
            names.push(array2.name);
          }
          break;
        }
      }
    }
  }
  let match = names[randomInteger(0, names.length - 1)];

  let matchUser = await User.findOne(
    { name: match },
    "name position email telegram lifePos teamStatus wordPlace projectTime tags"
  );
  res.status(200);
  res.send(JSON.stringify(matchUser));
});

app.get("/getAllUsers", jsonParser, (req, res) => {
  User.find(
    {},
    "name position email telegram lifePos teamStatus wordPlace projectTime tags",
    function (err, user) {
      console.log(user);

      res.send(JSON.stringify(user));
    }
  ).catch((err) => {
    res.status(500);
    res.send(err);
    console.error(err);
  });
});

app.post("/registration", jsonParser, (req, res) => {
  body = req.body;
  User.create({
    name: body.name,
    position: body.position,
    email: body.email,
    image: body.image,
    telegram: body.telegram,
    lifePos: body.lifePos,
    teamStatus: body.teamStatus,
    wordPlace: body.wordPlace,
    projectTime: body.projectTime,
    tags: body.tags,
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
