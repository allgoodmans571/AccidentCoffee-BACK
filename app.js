const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/reg", (req, res) => {
  res.send({ status: "OK" });
});



app.listen(8080);
console.log("Сервер стартовал");
