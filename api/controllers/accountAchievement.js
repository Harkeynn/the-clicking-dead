const AccountAchievement = require("../models/accountAchievement")

function index(req, res) {
  AccountAchievement.findAll().then(accountAchievement => {
    res.json(accountAchievement)
    res.end()
  })
}

function create(req, res) {
  AccountAchievement.create({
      iduser: req.body.iduser,
      idachievement: req.body.idachievement
  })
  res.end()
}

module.exports = { index, create }
