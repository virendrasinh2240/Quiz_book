const Chepter = require("../models/chepter");

const getChepter = async (req, res) => {
    try {

        const findChepter = await Chepter.findAll({});

        if (!findChepter) {
            return res.status(404).json({ error: "Chepter not found" });
        }

        res.status(200).json({ data: findChepter });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getChepter;
