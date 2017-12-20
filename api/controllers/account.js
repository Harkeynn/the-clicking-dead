const Account = require("../models/account")

function index(req, res) {
    Account.findAll().then(accounts => {
        res.json(accounts)
        res.end()
    })
}

function indexOne(req, res) {
    Account.findOne({ where: {nickname: req.params.nickname} })
    .then(account => {
        res.json(account)
        res.end()
    })
}

function indexOneWithId(req, res) {
    Account.findOne({ where: {id: req.params.id} })
    .then(account => {
        res.json(account)
        res.end()
    })
}

function create(req, res) {
    var body = null
    var dataBuffers = []
    req.on('data', (data) => { dataBuffers.push(data)})
    req.on('end', () => {
        body = Buffer.concat(dataBuffers).toString()
        body = JSON.parse(body)
        console.log('All datas has been received and can now be used: ', body)
        Account.create({
            email: body.email,
            nickname: body.nickname,
            password: body.password
        })
        res.end()
    })
}

module.exports = { index, indexOne, indexOneWithId, create }
