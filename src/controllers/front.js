const { Menu, Place, Movie } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");

const showFront = async (req, res) => {
    try {
        const places = await Place.findAll({
            where: {
                isFav: true,
            },
            order: sequelize.random(),
            limit: 3,
        });

        const plainPlaces = places.map((place) => place.get({ plain: true }));

        plainPlaces.map((place) => {
            if (place.imageURL) {
                place.imageURL = getURL(place.imageURL, 380, 260);
            }
        });

        const menus = await Menu.findAll({
            where: {
                isFav: true,
            },
            order: sequelize.random(),
            limit: 3,
            include: [
                {
                    model: Place,
                    as: "place",
                    attributes: ["name"],
                },
            ],
        });

        const plainMenus = menus.map((menu) => menu.get({ plain: true }));

        plainMenus.map((menu) => {
            if (menu.imageURL) {
                menu.imageURL = getURL(menu.imageURL, 380, 260);
            }
        });

        const movies = await Movie.findAll({
            where: {
                isFav: true,
            },
            order: sequelize.random(),
            limit: 3,
        });

        const plainMovies = movies.map((movie) => movie.get({ plain: true }));

        plainMovies.map((movie) => {
            if (movie.imageURL) {
                movie.imageURL = getURL(movie.imageURL, 380, 260);
            }
        });

        res.render("front/index", {
            isFront: true,
            places: plainPlaces,
            menus: plainMenus,
            movies: plainMovies,
        });
    } catch (error) {
        console.log("ERROR ==> " + error);
    }
};

module.exports = {
    showFront,
};
