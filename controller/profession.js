const signUp = require("../models/signUp");

const profession = async (req, res) => {
    try {

        // const professionMap = {
        //     "student": 1,
        //     "teacher": 2,
        //     "admin": 3
        // }
        const professions = await signUp.findAll({ attributes: ["professionId"] })
       
        // const professionArray = professions.map(profession => {
        //     const professionId = professionMap[profession.professionId] || "unkonow"
        //     return {
        //         id: professionId,
        //         name: profession.professionId
        //     }
        // })
        res.status(200).json({ professions });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = profession
