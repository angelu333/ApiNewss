const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const New = connection.define('new', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    estado_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: State,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'URL-friendly version del título para rutas limpias (ej: mi-noticia-titulo)'
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    estado_publicacion: {
        type: DataTypes.ENUM('borrador', 'publicado', 'archivado'),
        allowNull: false,
        defaultValue: 'borrador',
        comment: 'Estado de publicación: borrador, publicado o archivado'
    },
    visitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Contador de visitas/lecturas'
    },
    comentarios_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Contador de comentarios (desnormalizado para performance)'
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    tableName: 'news',
    timestamps: true,
    comment: 'Tabla de noticias/artículos del blog con metadata de publicación'
});

// Relaciones: New pertenece a Category, State y User
New.belongsTo(Category, { 
    as: 'categoria', 
    foreignKey: 'categoria_id' 
});

New.belongsTo(State, { 
    as: 'estado', 
    foreignKey: 'estado_id' 
});

New.belongsTo(User, { 
    as: 'usuario', 
    foreignKey: 'usuario_id' 
});

// Relaciones inversas
Category.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'categoria_id' 
});

State.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'estado_id' 
});

User.hasMany(New, { 
    as: 'noticias', 
    foreignKey: 'usuario_id' 
});

module.exports = { New };