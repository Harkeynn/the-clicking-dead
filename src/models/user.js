const db = require('../db.js');
const Sequelize = require('sequelize');

const User = db.define('User', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

User.sync({force: true}).then(() => {
    // Table created
    User.create({
        username: 'Admin',
        password: 'Admin'
    });
});

module.exports = User;