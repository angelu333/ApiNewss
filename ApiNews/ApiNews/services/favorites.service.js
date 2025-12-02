const { Favorite, User, New } = require('../models');

class FavoritesService {
    /**
     * Agregar una noticia a favoritos del usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} noticiaId - ID de la noticia
     * @returns {Object} Favorite creado
     */
    async addFavorite(usuarioId, noticiaId) {
        try {
            // Verificar si ya existe
            const existingFavorite = await Favorite.findOne({
                where: { usuario_id: usuarioId, noticia_id: noticiaId }
            });

            if (existingFavorite) {
                throw new Error('Esta noticia ya está en tus favoritos');
            }

            // Crear nuevo favorito
            const favorite = await Favorite.create({
                usuario_id: usuarioId,
                noticia_id: noticiaId
            });

            return favorite;
        } catch (error) {
            throw new Error(`Error al agregar favorito: ${error.message}`);
        }
    }

    /**
     * Remover una noticia de favoritos del usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} noticiaId - ID de la noticia
     * @returns {string} Mensaje de confirmación
     */
    async removeFavorite(usuarioId, noticiaId) {
        try {
            const favorite = await Favorite.findOne({
                where: { usuario_id: usuarioId, noticia_id: noticiaId }
            });

            if (!favorite) {
                throw new Error('Este favorito no existe');
            }

            await favorite.destroy();
            return 'Favorito removido correctamente';
        } catch (error) {
            throw new Error(`Error al remover favorito: ${error.message}`);
        }
    }

    /**
     * Obtener todos los favoritos de un usuario
     * @param {number} usuarioId - ID del usuario
     * @returns {Array} Lista de noticias favoritas
     */
    async getUserFavorites(usuarioId) {
        try {
            const user = await User.findByPk(usuarioId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const favorites = await Favorite.findAll({
                where: { usuario_id: usuarioId },
                include: [
                    {
                        model: New,
                        as: 'noticia',
                        attributes: [
                            'id',
                            'titulo',
                            'slug',
                            'descripcion',
                            'imagen',
                            'fecha_publicacion',
                            'visitas',
                            'comentarios_count',
                            'estado_publicacion'
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            // Devolver solo las noticias anidadas para simplificar el consumo en el frontend
            const noticias = favorites
                .map(f => (f && f.noticia ? f.noticia : null))
                .filter(n => n !== null);

            return noticias;
        } catch (error) {
            throw new Error(`Error al obtener favoritos: ${error.message}`);
        }
    }

    /**
     * Verificar si una noticia está en favoritos del usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} noticiaId - ID de la noticia
     * @returns {boolean} true si está en favoritos, false si no
     */
    async isFavorited(usuarioId, noticiaId) {
        try {
            const favorite = await Favorite.findOne({
                where: { usuario_id: usuarioId, noticia_id: noticiaId }
            });

            return !!favorite;
        } catch (error) {
            throw new Error(`Error al verificar favorito: ${error.message}`);
        }
    }

    /**
     * Obtener todos los usuarios que han marcado una noticia como favorita
     * @param {number} noticiaId - ID de la noticia
     * @returns {Array} Lista de usuarios que la favoritearon
     */
    async getNewFavoritedBy(noticiaId) {
        try {
            const news = await New.findByPk(noticiaId);
            if (!news) {
                throw new Error('Noticia no encontrada');
            }

            const favorites = await Favorite.findAll({
                where: { noticia_id: noticiaId },
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'nombre',
                            'apellidos',
                            'nick',
                            'avatar',
                            'verificado'
                        ]
                    }
                ]
            });

            return favorites;
        } catch (error) {
            throw new Error(`Error al obtener usuarios que favoritearon: ${error.message}`);
        }
    }

    /**
     * Obtener conteo de favoritos de una noticia
     * @param {number} noticiaId - ID de la noticia
     * @returns {number} Cantidad de favoritos
     */
    async getFavoritesCount(noticiaId) {
        try {
            const count = await Favorite.count({
                where: { noticia_id: noticiaId }
            });

            return count;
        } catch (error) {
            throw new Error(`Error al contar favoritos: ${error.message}`);
        }
    }
}

module.exports = new FavoritesService();
