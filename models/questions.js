const { DataTypes } = require('sequelize');
const sequelize = require('../public/conn');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stdId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chepterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    questionNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    questions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    options: {
        type: DataTypes.JSON, 
        allowNull: false
    },
    rightAns: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Question;
