const sequelize = require("../public/conn");
const Std = require("./std");
const Subject = require("./subject");
const Chapter = require("./chapter");
const Question = require("./question");
const UserResult = require("./UserResult");
const UserHistory = require("./UserHistory");
const SignUp = require("./signUp");

Std.hasMany(Subject, { foreignKey: "stdId" });
Subject.belongsTo(Std, { foreignKey: "stdId" });

Subject.hasMany(Chapter, { foreignKey: "subId" });
Chapter.belongsTo(Subject, { foreignKey: "subId" });

Chapter.hasMany(Question, { foreignKey: "chapterId" });
Question.belongsTo(Chapter, { foreignKey: "chapterId" });


const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({ alter: true });
        console.log("All tables synchronized");
    } catch (err) {
        console.error("Error synchronizing tables:", err);
    }
};

syncDatabase();

module.exports = {
    Std,
    Subject,
    Chapter,
    Question,
    UserResult,
    UserHistory,
    SignUp
};
