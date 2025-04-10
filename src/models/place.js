const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Place = sequelize.define(
    "place",
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
        parking: {
            type: DataTypes.ENUM("free", "bayar"),
            allowNull: false,
            defaultValue: "bayar",
        },
        wifi: {
            type: DataTypes.ENUM("lambat", "biasa", "lancar"),
            allowNull: true,
        },
        room: {
            type: DataTypes.ENUM("sempit", "biasa", "luas"),
            allowNull: false,
            defaultValue: "biasa",
        },
        openHour: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "open_hour",
        },
        closeHour: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "close_hour",
        },
        priceMin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "price_min",
        },
        priceMax: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "price_max",
        },
        himRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            field: "him_rating",
        },
        herRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
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
        mapURL: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "map_url",
        },
    },
    {
        tableName: "places",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Place;
