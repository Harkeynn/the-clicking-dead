const Leaderboard = require("../models/leaderboard")

function index(req, res) {
    Leaderboard.findAll({order: [['score', 'DESC']]}).then(leaderboard => {
        res.json(leaderboard)
        res.end()
    })
}

// function indexOne(req, res) {
//     Account.findOne({ where: {nickname: req.params.nickname} })
//     .then(account => {
//         res.json(account)
//         res.end()
//     })
// }

function create(req, res) {
    var body = null
    var dataBuffers = []
    req.on('data', (data) => { dataBuffers.push(data)})
    req.on('end', () => {
        body = Buffer.concat(dataBuffers).toString()
        body = JSON.parse(body)
        console.log('All datas has been received and can now be used: ', body)
        Leaderboard.create({
            nickname: body.nickname,
            score: body.score
        })
        res.end()
    })
}

module.exports = { index, /*indexOne,*/ create }