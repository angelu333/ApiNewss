const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const Profile = connection.define('profile', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'profiles',
    timestamps: true
});

module.exports = { Profile };