const { Menu, Place } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");

const listMenus = async (req, res) => {
    try {
        const search = req.query.search || "";

        const menus = await Menu.findAll({
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

        const plainMenus = menus.map((menu) => menu.get({ plain: true }));

        plainMenus.map((menu) => {
            if (menu.imageURL) {
                menu.imageURL = getURL(menu.imageURL, 380, 260);
            }
        });

        res.render("menu/index", {
            isMenu: true,
            menus: plainMenus,
            search,
        });
    } catch (error) {
        console.log("ERROR ==> " + error);
    }
};

module.exports = { listMenus };
