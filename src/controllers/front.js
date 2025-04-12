const showFront = (req, res) => {
    res.render("index", {
        isFront: true,
    });
};

module.exports = {
    showFront,
};
