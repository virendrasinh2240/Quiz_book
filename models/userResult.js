const { DataTypes } = require("sequelize");
const sequelize = require("../public/conn");

const UserResult = sequelize.define("UserResult", {
    resultId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stdId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chepterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    queid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = UserResult;
