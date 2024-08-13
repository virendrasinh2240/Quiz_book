const { DataTypes } = require("sequelize");
const sequelize = require("../public/conn");
const Question = require("./questions");

const Chepter = sequelize.define("Chepter", {
    chepterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stdId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    subId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chepterNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    teacher: {
        type: DataTypes.STRING,
        allowNull: true
    },
    que: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    min: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Chepter.hasMany(Question, { foreignKey: "chepterId" });
Question.belongsTo(Chepter, { foreignKey: "chepterId" });

module.exports = Chepter;
