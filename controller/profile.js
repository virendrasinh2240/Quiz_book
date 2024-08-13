
const signUp = require('../models/signUp');

const getProfile = async (req, res) => {
    try {
        const user = await signUp.findByPk(req.userId); 
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
        
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getProfile;
