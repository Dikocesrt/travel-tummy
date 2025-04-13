const { Menu, Place, Photo } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");

const listMenus = async (req, res) => {
    try {
        const search = req.query.search || "";

        let menus, actionURL, isMenu;

        let place = "";

        if (req.params.id) {
            const placeID = req.params.id;

            place = await Place.findByPk(placeID);

            actionURL = `/places/${placeID}/menus`;

            isMenu = false;

            menus = await Menu.findAll({
                order: [["created_at", "ASC"]],
                where: {
                    placeID: placeID,
                    [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
                },
            });
        } else {
            actionURL = "/menus";

            isMenu = true;

            menus = await Menu.findAll({
                order: [["created_at", "ASC"]],
                where: {
                    [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
                },
                include: [
                    {
                        model: Place,
                        as: "place",
                        attributes: ["name"],
                    },
                ],
            });
        }

        const plainMenus = menus.map((menu) => menu.get({ plain: true }));

        plainMenus.map((menu) => {
            if (menu.imageURL) {
                menu.imageURL = getURL(menu.imageURL, 380, 260);
            }
        });

        res.render("menu/index", {
            isMenu,
            menus: plainMenus,
            search,
            actionURL,
            place,
        });
    } catch (error) {
        console.log("ERROR ==> " + error);
    }
};

const detailMenu = async (req, res) => {
    try {
        const id = req.params.id;

        const menu = await Menu.findByPk(id, {
            include: [
                {
                    model: Place,
                    as: "place",
                },
            ],
        });

        if (!menu) {
            res.redirect("/menus");
        }

        const plainMenu = menu.get({ plain: true });

        const smallImage = getURL(plainMenu.imageURL, 340, 250);

        if (plainMenu.imageURL) {
            plainMenu.imageURL = getURL(plainMenu.imageURL, 1450, 620);
        }

        const photos = await Photo.findAll({
            where: {
                placeID: menu.place.id,
            },
            order: sequelize.random(),
            limit: 4,
        });

        if (photos.length > 0) {
            photos.map((photo) => {
                if (photo.imageURL) {
                    photo.imageURL = getURL(photo.imageURL, 380, 400);
                }
            });
        }

        res.render("menu/detail", {
            menu: plainMenu,
            smallImage,
            photos,
        });
    } catch (error) {
        console.log("DETAIL MENU ERROR ==> " + error);
    }
};

module.exports = { listMenus };
