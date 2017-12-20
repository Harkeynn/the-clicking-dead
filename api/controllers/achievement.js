const Achievement = require("../models/achievement")

function index(req, res) {
    Achievement.findAll().then(achievement => {
        res.json(achievement)
        res.end()
    })
}

module.exports = { index }
