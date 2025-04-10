const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Photo = sequelize.define(
    "photo",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: "photos",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Photo;
