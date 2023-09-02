const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GroupMessage = sequelize.define('groupMessage', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: Sequelize.DataTypes.STRING,
    userId: Sequelize.DataTypes.INTEGER
});

module.exports = GroupMessage;