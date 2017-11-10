const db = require('../db.js')
const Sequelize = require('sequelize')

const Leaderboard = db.define('Leaderboard', {
	nickname: {
		type: Sequelize.STRING
	},
	score: {
		type: Sequelize.INTEGER
	}
})

Leaderboard.sync().then(() => {
	// Table created
	Leaderboard.findOne({ where: { id: 1 } })
		.then(leaderboard => {
			if (leaderboard === null) {
				Leaderboard.create({
					nickname: 'Nereyde',
					score: 888888888
				})
				Leaderboard.create({
					nickname: 'Jeremy',
					score: 999999999
				})
			}
		})
})

module.exports = Leaderboard