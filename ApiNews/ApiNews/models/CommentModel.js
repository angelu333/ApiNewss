const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const Comment = connection.define('comment', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    noticia_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'news', // tabla de noticias
            key: 'id'
        },
        comment: 'Referencia a la noticia comentada'
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users', // tabla de usuarios
            key: 'id'
        },
        comment: 'Referencia al usuario que comenta'
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 2000]
        },
        comment: 'Contenido del comentario (máximo 2000 caracteres)'
    },
    aprobado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Si el comentario ha sido aprobado por un moderador'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Indica si el comentario está activo o borrado'
    }
}, {
    tableName: 'comments',
    timestamps: true,
    comment: 'Tabla de comentarios en noticias del blog'
});

module.exports = { Comment };
