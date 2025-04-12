const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");
const { listPlaces, detailPlace } = require("../controllers/place");
const { listMenus } = require("../controllers/menu");
const { listMovies } = require("../controllers/movie");

router.get("/", showFront);

router.get("/places", listPlaces);

router.get("/menus", listMenus);

router.get("/movies", listMovies);

router.get("/places/:id", detailPlace);

module.exports = router;
