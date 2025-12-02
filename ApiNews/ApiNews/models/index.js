// Importar todos los modelos para establecer relaciones
const { Profile } = require('./ProfileModel');
const { State } = require('./StateModel');
const { Category } = require('./CategoryModel');
const { User } = require('./UserModel');
const { New } = require('./NewModel');
const { Comment } = require('./CommentModel');
const { Favorite } = require('./FavoriteModel');

// Definir relaciones
// Noticias -> Comentarios (1 a muchos)
New.hasMany(Comment, {
    as: 'comentarios',
    foreignKey: 'noticia_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(New, {
    as: 'noticia',
    foreignKey: 'noticia_id'
});

// Usuarios -> Comentarios (1 a muchos)
User.hasMany(Comment, {
    as: 'comentarios',
    foreignKey: 'usuario_id'
});

Comment.belongsTo(User, {
    as: 'autor',
    foreignKey: 'usuario_id'
});

// Usuarios -> Favoritos (muchos a muchos a través de Favorite)
User.belongsToMany(New, {
    through: Favorite,
    as: 'noticias_favoritas',
    foreignKey: 'usuario_id',
    otherKey: 'noticia_id',
    timestamps: true
});

New.belongsToMany(User, {
    through: Favorite,
    as: 'usuarios_favorito',
    foreignKey: 'noticia_id',
    otherKey: 'usuario_id',
    timestamps: true
});

// Exportar todos los modelos
module.exports = {
    Profile,
    State,
    Category,
    User,
    New,
    Comment,
    Favorite
};

// Asociaciones directas para facilitar includes desde el modelo Favorite
// (permiten hacer Favorite.findAll({ include: [{ model: New, as: 'noticia' }] }))
Favorite.belongsTo(New, {
    as: 'noticia',
    foreignKey: 'noticia_id'
});

Favorite.belongsTo(User, {
    as: 'usuario',
    foreignKey: 'usuario_id'
});

// Relación inversa (opcional, útil para accesos desde New/User hacia Favorite)
New.hasMany(Favorite, {
    as: 'favoritos',
    foreignKey: 'noticia_id'
});

User.hasMany(Favorite, {
    as: 'favoritos',
    foreignKey: 'usuario_id'
});