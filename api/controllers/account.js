const Account = require("../models/account")
const userId = require("../userdata.json")
var bcrypt = require('bcrypt-nodejs');

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

function saveStats(req, res){
    console.log("uhezhfuizehih")
    console.log(req.body);
    Account.update(
        {
            nbzombies: req.body.nbzombies,
            nbhumains: req.body.nbhumains,
            score: req.body.score
        },
        {where: {id: userId.id}}
    )
    };

    
    function updatePassword(req, res){
        Account.update(
            {
                password: bcrypt.hashSync(req.body.pass, null, null)
            },
            {where: {id: userId.id}}
        )


        
        // Account.update(
        //     {
        //         nbzombies: req.body.nbzombies,
        //         nbhumains: req.body.nbhumains,
        //         score: req.body.score
        //     },
        //     {where: {id: userId.id}}
        // )
        };

module.exports = { index, indexOne, indexOneWithId, create, saveStats, updatePassword }
