const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: 'db.sqlite'
});

module.exports = db;