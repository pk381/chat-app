const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GroupUser = sequelize.define('groupUser', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    groupUserId: Sequelize.DataTypes.INTEGER,
    isAdmin: Sequelize.DataTypes.BOOLEAN
});

module.exports = GroupUser;

