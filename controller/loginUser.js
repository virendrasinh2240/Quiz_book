const jwt = require('jsonwebtoken');
const signUp = require('../models/signUp');

const loginUser = async (req, res) => {
    const { mobileNumber } = req.body;

    try {
        const user = await signUp.findOne({ where: { mobileNumber } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({userId:user.userId} , "thisismyproject");
        res.status(201).json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = loginUser;
