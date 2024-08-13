const signUp = require('../models/signUp');

const updateProfile = async (req, res) => {
    try {
        const { firstname, lastname, email, genderId, DOB, mobileNumber, professionId } = req.body;
        console.log(req.body);

        const userProfile = req.file ? req.file.filename : null;

        const user = await signUp.findByPk(req.userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.genderId = genderId;
        user.DOB = DOB;
        user.mobileNumber = mobileNumber;
        user.professionId = professionId;
        if (userProfile) {
            user.userProfile = userProfile;
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateProfile;
