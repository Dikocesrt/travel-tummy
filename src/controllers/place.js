const { Place, Menu, Photo } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");
const sequelize = require("../configs/database");
const marked = require("marked");

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

        plainPlaces.map((place) => {
            if (place.description) {
                place.descriptionHTML = marked.parse(place.description);
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

        const smallImage = getURL(plainPlace.imageURL, 340, 250);

        if (plainPlace.imageURL) {
            plainPlace.imageURL = getURL(plainPlace.imageURL, 1450, 620);
        }

        if (plainPlace.mapURL) {
            plainPlace.mapURL = getURL(plainPlace.mapURL, 1450, 400);
        }

        const plainMenus = menus.map((menu) => menu.get({ plain: true }));

        if (plainMenus.length > 0) {
            plainMenus.map((menu) => {
                if (menu.imageURL) {
                    menu.imageURL = getURL(menu.imageURL, 380, 260);
                }
            });
        }

        const plainPhotos = photos.map((photo) => photo.get({ plain: true }));

        if (plainPhotos.length > 0) {
            plainPhotos.map((photo) => {
                if (photo.imageURL) {
                    photo.imageURL = getURL(photo.imageURL, 380, 400);
                }
            });
        }

        if (plainPlace.description) {
            plainPlace.descriptionHTML = marked.parse(plainPlace.description);
        }

        res.render("place/detail", {
            place: plainPlace,
            smallImage,
            menus: plainMenus,
            photos: plainPhotos,
        });
    } catch (error) {
        console.log("DETAIL PLACE ERROR ==> " + error);
    }
};

module.exports = { listPlaces, detailPlace };
