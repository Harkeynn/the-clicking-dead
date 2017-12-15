const db = require('../db.js')
const Sequelize = require('sequelize')
var bcrypt = require('bcrypt-nodejs');

const Account = db.define('accounts', {
	nickname: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	nbzombies: {
		type: Sequelize.INTEGER
	},
	nbhumains: {
		type: Sequelize.INTEGER
	},
	score: {
		type: Sequelize.INTEGER
	}
})

Account.sync().then(() => {
	// Table created
	Account.findOne({ where: { id: 1 } })
		.then(account => {
			if (account === null) {
				Account.create({
					id: 1,
					nickname: 'Admin',
					password: bcrypt.hashSync('Admin', null, null),
					email: 'admin@ad.min',
					nbzombies: 100000,
					nbhumains: 0,
					score: 0,
					
				})
			}
		})
})

module.exports = Account