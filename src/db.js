const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: 'DB/db.sqlite'
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db;
