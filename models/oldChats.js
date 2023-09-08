const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const oldMessage = sequelize.define('oldMessage', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: Sequelize.DataTypes.STRING,
    toUserId: Sequelize.DataTypes.INTEGER
});

module.exports = oldMessage;