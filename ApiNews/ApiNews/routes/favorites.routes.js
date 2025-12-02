const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const { authenticateAny, authenticateAdmin } = require('../middlewares/jwt');

// ✅ ORDEN CORRECTO: Rutas más específicas PRIMERO

// 1. Rutas que empiezan con /news (más específicas)
// Obtener todos los usuarios que favoritearon una noticia
// GET /api/users/news/:noticiaId/favorited-by
router.get('/news/:noticiaId/favorited-by', favoritesController.getNewFavoritedBy);

// Obtener conteo de favoritos de una noticia
// GET /api/users/news/:noticiaId/favorites-count
router.get('/news/:noticiaId/favorites-count', favoritesController.getFavoritesCount);

// 2. Rutas con múltiples segmentos específicos
// Verificar si una noticia está en favoritos del usuario
// GET /api/users/:usuarioId/favorites/:noticiaId/check
router.get('/:usuarioId/favorites/:noticiaId/check', favoritesController.isFavorited);

// 3. Rutas CRUD con parámetros (después de las más específicas)
// Agregar noticia a favoritos del usuario
// POST /api/users/:usuarioId/favorites/:noticiaId
router.post('/:usuarioId/favorites/:noticiaId', authenticateAny, favoritesController.addFavorite);

// Remover noticia de favoritos del usuario
// DELETE /api/users/:usuarioId/favorites/:noticiaId
router.delete('/:usuarioId/favorites/:noticiaId', authenticateAny, favoritesController.removeFavorite);

// Obtener todos los favoritos de un usuario
// GET /api/users/:usuarioId/favorites
router.get('/:usuarioId/favorites', favoritesController.getUserFavorites);

module.exports = router;
