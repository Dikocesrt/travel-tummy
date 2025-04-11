const Place = require("./place");
const Menu = require("./menu");
const Photo = require("./photo");
const Movie = require("./movie");

Place.hasMany(Menu, { foreignKey: "placeID", as: "menus" });
Place.hasMany(Photo, { foreignKey: "placeID", as: "photos" });

Menu.belongsTo(Place, { foreignKey: "placeID", as: "place" });

Photo.belongsTo(Place, { foreignKey: "placeID", as: "place" });

module.exports = { Place, Menu, Photo, Movie };
