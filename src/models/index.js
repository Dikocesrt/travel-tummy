const Place = require("./place");
const Menu = require("./menu");

const initializeTables = async () => {
    try {
        await Place.sync();
        await Menu.sync();
        console.log("✅ Tables synchronized successfully!");
    } catch (error) {
        console.error("❌ Database synchronization failed:", error);
    }
};

initializeTables();

module.exports = { Place };
