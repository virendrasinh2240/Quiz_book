const signUp = require("../models/signUp")

const gender = async (req, res) => {
    try {

        // const genderMap = {
        //     "male": "1",
        //     "female": "2",
        //     "other": "3"
        // }

        const getGenders = await signUp.findAll({attributes:["genderId"]})
        // const genderArray = getGenders.map(getGender=>{
        //     const genderId = genderMap[getGender.genderId] || "unknown"
        //     return{
        //         id :genderId,
        //         name:getGender.genderId
        //     }
        // })
        res.status(200).json({ getGenders })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = gender