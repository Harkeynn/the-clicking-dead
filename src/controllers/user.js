const User = require("../models/user");
const pug = require('pug');

function index(req, res) {
    User.findAll().then(users => {
        // console.log(message);
        res.write(pug.renderFile('src/views/user/index.pug', {
            users: users
        }));
        //res.write(message.pseudo + " : " + message.message);
        res.end();
    });
}

module.exports = { index }