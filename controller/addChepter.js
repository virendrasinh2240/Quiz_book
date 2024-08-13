const Chepter = require("../models/chepter")

const addChepter = async(req,res)=>{
    try {
        const {  stdId, subId, chepterNo, content, teacher, que, min } = req.body;

        const data = await Chepter.create({
            
            stdId,
            subId,
            chepterNo,
            content,
            teacher,
            que,
            min
        });
        await data.save();
        res.status(201).json({ data });
    } catch (error) {
        res.status(404).json({ error });
    }

} 

module.exports = addChepter