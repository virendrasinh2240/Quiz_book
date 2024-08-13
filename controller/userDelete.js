const signUp = require("../models/signUp")

const deleteUser = async(req,res)=>{
    const {mobileNumber} = req.body

    const user = await signUp.destroy({ where: { mobileNumber } });
    console.log(user)
    res.status(201).json({user})
}
module.exports = deleteUser