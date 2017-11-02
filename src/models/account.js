const db = require('../db.js');
const Sequelize = require('sequelize');

const Account = db.define('Account', {
    nickname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

Account.sync({force: true}).then(() => {
    // Table created
    Account.create({
        nickname: 'Admin',
        password: 'Admin'
    });
});

module.exports = Account;