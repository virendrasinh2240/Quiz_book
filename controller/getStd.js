
const Std = require("../models/std");
const Subject = require("../models/subject");

const getStd = async (req, res) => {
    try {
        const data = await Std.findAll({
            include: [Subject] 
        });
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getStd;
