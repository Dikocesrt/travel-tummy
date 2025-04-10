// IMPORT
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const router = require("./routes/route");
require("dotenv").config();
require("./configs/database");
require("./models/index");

// WEB SERVER
const app = express();

// TEMPLATE ENGINE CONFIGS
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// PUBLIC DIR CONFIGS
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// ROUTES
app.use(router);

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
