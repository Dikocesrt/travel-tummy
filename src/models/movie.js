const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Movie = sequelize.define(
    "movie",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "image_url",
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
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
    },
    {
        tableName: "movies",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Movie;
