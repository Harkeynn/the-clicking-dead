const qs = require('querystring')
const accountController = require('./controllers/account')
const leaderboardController = require('./controllers/leaderboard')
const cors = require('./middlewares/cors')
const express = require('express')
const app = express()
const port = 1973

app.use(cors)

app.get('/accounts', (req, res) => {
    return accountController.index(req, res)
})

app.post('/accounts', (req, res) => {
    return accountController.create(req, res)
})

app.get('/accounts/:nickname', (req, res) => {
    return accountController.indexOne(req, res)
})

app.get('/leaderboard', (req, res) => {
    return leaderboardController.index(req, res)
})

app.post('/leaderboard', (req, res) => {
    return leaderboardController.create(req, res)
})

app.use((req, res) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    console.log('Listening on ', port)
})