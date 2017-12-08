const Sequelize = require('sequelize');
const DBCONF = require('./db.conf');

const db = new Sequelize(DBCONF.database, DBCONF.user, DBCONF.password, {
    host:  DBCONF.host,
    dialect: DBCONF.dialect,

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
