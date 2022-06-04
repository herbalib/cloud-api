//Initiate package
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// Import all module
const plants = require("./routes/plants.js");
const auth = require("./routes/auth.js");
const locations = require("./routes/locations.js");

// Define Routes
app.use("/plants", plants);
app.use("/auth", auth);
app.use("/locations", locations);

const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
console.log(listEndpoints(app))
app.listen(3000);
