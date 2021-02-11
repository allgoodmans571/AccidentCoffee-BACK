const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
const { json } = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/static", express.static(__dirname + "/public"));

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
  console.log(name);

  let query = await User.findOne({ name }, "tags", (err, query) => {
    return query;
  });
  let key = query.tags;
  // console.log(key);

  let allData = await User.find(
    {},
    "name position email telegram lifePos teamStatus wordPlace projectTime tags"
  );

  for (let i = 0; i < allData.length; i++) {
    findTags(key, allData[i], name);
  }

  function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function findTags(array1, array2, name) {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2["tags"].length; j++) {
        if ((array1[i] = array2["tags"][j])) {
          if (names.indexOf(array2.name) === -1 && array2.name !== name) {
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
    "name position email telegram lifePos teamStatus wordPlace projectTime tags image"
  );

  console.log("MATCHED");
  res.status(200);
  await res.send(JSON.stringify(matchUser));
});

app.get("/getAllUsers", jsonParser, (req, res) => {
  User.find(
    {},
    "name position email telegram lifePos teamStatus wordPlace projectTime tags image",
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

app.post("/registration", jsonParser, async (req, res) => {
  body = req.body;

  await User.create({
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
      res.status(200);
      console.log("saved");
    })
    .catch((err) => {
      res.status(500);
      console.error(err);
    });
});

app.listen(8080);
console.log("Сервер стартовал");
