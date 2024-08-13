const { DataTypes } = require("sequelize");
const sequelize = require("../public/conn");
const Chepter = require("./chepter");

const Subject = sequelize.define("Subject", {
    subId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stdId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Subject.hasMany(Chepter, { foreignKey: "subId" });
Chepter.belongsTo(Subject, { foreignKey: "subId" });

module.exports = Subject;
