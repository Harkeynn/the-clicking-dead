const Sequelize = require('sequelize');
const DBCONF = require('./db.conf');

const db = new Sequelize(DBCONF.DB_NAME, DBCONF.DB_LOGIN, DBCONF.DB_PASSWORD, {
    host:  DBCONF.DB_HOST,
    dialect: DBCONF.DB_DIALECT,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});



db.authenticate().then(() => {
  console.log('Connection has been established successfully.')
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})

module.exports = db;
