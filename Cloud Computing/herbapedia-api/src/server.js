require("dotenv").config();

//Initiate package
const express = require("express");
const app = express();
const routes = require("./routes");

app.use("/",routes);
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});


const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
console.log(listEndpoints(app))

app.listen(3000, function () {
  console.log(`Example app listening on port 3000!`);
});
