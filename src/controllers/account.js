const Account = require("../models/account");
const pug = require('pug');

function index(req, res) {
    Account.findAll().then(accounts => {
        // console.log(message);
        res.write(pug.renderFile('src/views/account/index.pug', {
            accounts: accounts
        }));
        //res.write(message.pseudo + " : " + message.message);
        res.end();
    });
}

module.exports = { index }