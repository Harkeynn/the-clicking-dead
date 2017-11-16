const db = require('../db.js')
const Sequelize = require('sequelize')
const passwordHash = require('password-hash')

const Account = db.define('Account', {
	email: {
		type: Sequelize.STRING
	},
	nickname: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
})

Account.sync().then(() => {
	// Table created
	Account.findOne({ where: { id: 1 } })
		.then(account => {
			if (account === null) {
				Account.create({
					email: 'admin@ad.min',
					nickname: 'Admin',
					password: passwordHash.generate('Admin')
				})
			}
		})
})

module.exports = Account