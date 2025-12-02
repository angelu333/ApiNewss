const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Profile } = require('./ProfileModel');
const bcrypt = require('bcryptjs');

const User = connection.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    perfil_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Profile,
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nick: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Biografía o descripción del autor'
    },
    avatar: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null,
        comment: 'URL del avatar del usuario'
    },
    verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Indica si el usuario es verificado/oficial'
    },
    ultima_actividad: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: 'Última fecha en que el usuario se conectó'
    },
    UserAlta: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Admin"
    },
    FechaAlta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UserMod: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ""
    },
    FechaMod: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UserBaja: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ""
    },
    FechaBaja: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: true,
    defaultScope: {
        // Nunca incluir contraseña en las queries por defecto
        attributes: { exclude: ['contraseña'] }
    },
    scopes: {
        withPassword: {
            attributes: {} // include all including contraseña
        }
    },
    hooks: {
        // Hashear contraseña antes de crear o actualizar
        beforeCreate: async (user, options) => {
            if (user && user['contraseña']) {
                const salt = await bcrypt.genSalt(10);
                user['contraseña'] = await bcrypt.hash(user['contraseña'], salt);
            }
        },
        beforeUpdate: async (user, options) => {
            // Sólo re-hashear si la contraseña fue modificada
            if (user && user.changed && user.changed('contraseña') && user['contraseña']) {
                const salt = await bcrypt.genSalt(10);
                user['contraseña'] = await bcrypt.hash(user['contraseña'], salt);
            }
        }
    }
});

// Relación: User pertenece a Profile
User.belongsTo(Profile, { 
    as: 'perfil', 
    foreignKey: 'perfil_id' 
});

// Relación inversa: Profile tiene muchos Users
Profile.hasMany(User, { 
    as: 'usuarios', 
    foreignKey: 'perfil_id' 
});

module.exports = { User };