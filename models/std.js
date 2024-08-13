const { DataTypes } = require("sequelize");
const sequelize = require("../public/conn");
const Subject = require("./subject");

const Std = sequelize.define("Std", {
    stdId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    std: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Std.hasMany(Subject, { foreignKey: "stdId" });
Subject.belongsTo(Std, { foreignKey: "stdId" });

module.exports = Std;
