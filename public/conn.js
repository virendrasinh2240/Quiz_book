const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('quizbook', 'root', 'viru2240', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });

module.exports = sequelize;
