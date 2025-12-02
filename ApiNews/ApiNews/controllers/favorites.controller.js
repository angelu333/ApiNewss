const favoritesService = require('../services/favorites.service');

const addFavorite = async (req, res) => {
    try {
        const { usuarioId, noticiaId } = req.params;

        // Validar que el usuario autenticado es el dueño del recurso (o es admin)
        if (req.usuario.id !== parseInt(usuarioId) && req.usuario.perfil_id !== 1) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para agregar favoritos a otro usuario'
            });
        }

        const favorite = await favoritesService.addFavorite(usuarioId, noticiaId);
        res.status(201).json({
            success: true,
            message: 'Noticia agregada a favoritos correctamente',
            data: favorite
        });
    } catch (error) {
        const statusCode = error.message.includes('ya está') ? 409 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const { usuarioId, noticiaId } = req.params;

        // Validar que el usuario autenticado es el dueño del recurso (o es admin)
        if (req.usuario.id !== parseInt(usuarioId) && req.usuario.perfil_id !== 1) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para remover favoritos de otro usuario'
            });
        }

        const message = await favoritesService.removeFavorite(usuarioId, noticiaId);
        res.status(200).json({
            success: true,
            message
        });
    } catch (error) {
        const statusCode = error.message.includes('no existe') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const getUserFavorites = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const favorites = await favoritesService.getUserFavorites(usuarioId);
        res.status(200).json({
            success: true,
            message: 'Favoritos del usuario obtenidos correctamente',
            data: favorites
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const isFavorited = async (req, res) => {
    try {
        const { usuarioId, noticiaId } = req.params;

        const isFav = await favoritesService.isFavorited(usuarioId, noticiaId);
        res.status(200).json({
            success: true,
            message: 'Estado de favorito verificado',
            data: { isFavorited: isFav }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNewFavoritedBy = async (req, res) => {
    try {
        const { noticiaId } = req.params;

        const favorites = await favoritesService.getNewFavoritedBy(noticiaId);
        res.status(200).json({
            success: true,
            message: 'Usuarios que favoritearon esta noticia obtenidos correctamente',
            data: favorites
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const getFavoritesCount = async (req, res) => {
    try {
        const { noticiaId } = req.params;

        const count = await favoritesService.getFavoritesCount(noticiaId);
        res.status(200).json({
            success: true,
            message: 'Conteo de favoritos obtenido correctamente',
            data: { count }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getUserFavorites,
    isFavorited,
    getNewFavoritedBy,
    getFavoritesCount
};
