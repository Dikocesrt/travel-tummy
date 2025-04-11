const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Menu = sequelize.define(
    "menu",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "image_url",
        },
        portion: {
            type: DataTypes.ENUM(
                "cemil",
                "lumayan",
                "ngenyangin",
                "banyak",
                "super"
            ),
            allowNull: false,
            defaultValue: "ngenyangin",
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        himRating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "him_rating",
        },
        herRating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            field: "her_rating",
        },
        overallRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: "overall_rating",
        },
        isFav: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "is_fav",
        },
        placeID: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "place_id",
            references: {
                model: "places",
                key: "id",
            },
        },
    },
    {
        tableName: "menus",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Menu;
