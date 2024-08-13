const { DataTypes } = require("sequelize");
const sequelize = require("../public/conn");

const signUp = sequelize.define("signUp", {
    
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    genderId: {
        type: DataTypes.JSON, 
        allowNull: false,
    },
    DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    professionId: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    userProfile: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = signUp;
