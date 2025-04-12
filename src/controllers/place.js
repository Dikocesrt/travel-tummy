const { Place } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");

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
        console.log("ERROR ==> " + error);
    }
};

module.exports = { listPlaces };
