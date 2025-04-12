const { Movie } = require("../models/index");
const getURL = require("../helper/getCloudinary");
const { Op } = require("sequelize");

const listMovies = async (req, res) => {
    try {
        const search = req.query.search || "";

        const movies = await Movie.findAll({
            order: [["created_at", "ASC"]],
            where: {
                [Op.or]: [{ title: { [Op.like]: `%${search}%` } }],
            },
        });

        const plainMovies = movies.map((movie) => movie.get({ plain: true }));

        plainMovies.map((movie) => {
            if (movie.imageURL) {
                movie.imageURL = getURL(movie.imageURL, 380, 260);
            }
        });

        res.render("movie/index", {
            isMovie: true,
            movies: plainMovies,
            search,
        });
    } catch (error) {
        console.log("ERROR ==> " + error);
    }
};

module.exports = { listMovies };
