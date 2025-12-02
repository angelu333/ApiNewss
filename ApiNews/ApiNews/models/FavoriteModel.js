const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const Favorite = connection.define('favorite', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        comment: 'Usuario que marca como favorito'
    },
    noticia_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'news',
            key: 'id'
        },
        comment: 'Noticia marcada como favorita'
    }
}, {
    tableName: 'favorites',
    timestamps: true,
    uniqueKeys: {
        idx_unique_user_news_favorite: {
            fields: ['usuario_id', 'noticia_id']
        }
    },
    comment: 'Tabla de relación muchos-a-muchos: usuarios marcan noticias como favoritas'
});

module.exports = { Favorite };
