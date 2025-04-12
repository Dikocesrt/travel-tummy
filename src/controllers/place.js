const { Place, Menu, Photo } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");
const sequelize = require("../configs/database");

const listPlaces = async (req, res) => {
    try {
        const search = req.query.search || "";

        const places = await Place.findAll({
            order: [["created_at", "ASC"]],
            where: {
                [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
            },
        });

        const plainPlaces = places.map((place) => place.get({ plain: true }));

        plainPlaces.map((place) => {
            if (place.imageURL) {
                place.imageURL = getURL(place.imageURL, 380, 260);
            }
        });

        res.render("place/index", {
            isPlace: true,
            places: plainPlaces,
            search,
        });
    } catch (error) {
        console.log("LIST PLACE ERROR ==> " + error);
    }
};

const detailPlace = async (req, res) => {
    try {
        const id = req.params.id;
        const place = await Place.findByPk(id);

        if (!place) {
            res.redirect("/places");
        }

        const menus = await Menu.findAll({
            where: {
                placeID: id,
            },
            order: sequelize.random(),
            limit: 4,
        });

        const photos = await Photo.findAll({
            where: {
                placeID: id,
            },
            order: sequelize.random(),
            limit: 4,
        });

        const plainPlace = place.get({ plain: true });

        if (plainPlace.imageURL) {
            plainPlace.imageURL = getURL(plainPlace.imageURL, 1450, 620);
        }

        res.render("place/detail", {
            place: plainPlace,
            menus,
            photos,
        });
    } catch (error) {
        console.log("DETAIL PLACE ERROR ==> " + error);
    }
};

module.exports = { listPlaces, detailPlace };
