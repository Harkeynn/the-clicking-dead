const db = require('../db.js')
const Sequelize = require('sequelize')
var bcrypt = require('bcrypt-nodejs');

const Achievement = db.define('achievement', {
	libelle: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	image: {
		type: Sequelize.STRING
	},
	points: {
		type: Sequelize.INTEGER
	}
},{ tableName : "achievement"})

module.exports = Achievement
