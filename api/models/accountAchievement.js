const db = require('../db.js')
const Sequelize = require('sequelize')
var bcrypt = require('bcrypt-nodejs');

const AccountAchievement = db.define('accountachievement', {
	iduser: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	idachievement: {
		type: Sequelize.INTEGER
	}
},{ tableName : "accountachievement"})

module.exports = AccountAchievement
