const SignUp = require("../models/signUp");

const userSignUp = async (req, res) => {
    try {
        const { userId,firstname, lastname, email, genderId, DOB, mobileNumber, professionId } = req.body;
        const { filename: userProfile } = req.file;

        const genderMap = {
            1: "male",
            2: "female",
            3: "other"
        };

        const professionMap = {
            1: "student",
            2: "teacher",
            3: "admin"
        };

        const genderArray = (genderId) => {
            const genderName = genderMap[genderId] || "unknown";
            return {
                id: genderId,
                name: genderName
            };
        };

        const professionArray = (professionId) => {
            const professionName = professionMap[professionId] || "unknown";
            return {
                id: professionId,
                name: professionName
            };
        };

        const signUpData = await SignUp.create({
            userId,
            firstname,
            lastname,
            email,
            genderId: genderArray(genderId), 
            DOB,
            mobileNumber,
            professionId: professionArray(professionId), 
            userProfile,
        });

        res.status(201).json({ userId: signUpData.userId, signUpData });
        console.log(signUpData);

    } catch (e) {
        console.error("Error during user sign up:", e.message);
        res.status(404).json({ error: e.message });
    }
};

module.exports = userSignUp;
