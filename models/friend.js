const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Friend = sequelize.define('friend', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    friendId: Sequelize.DataTypes.INTEGER
});

module.exports = Friend;