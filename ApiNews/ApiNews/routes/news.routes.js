const { Router } = require('express');
const {
    getAllNews,
    getNewById,
    createNew,
    updateNew,
    deleteNew,
    getNewsByCategory,
    getNewsByState,
    getTrendingNews,
    getLatestNews,
    searchNews
} = require('../controllers/news.controller');
const { validateNewsData, validateId } = require('../middlewares/validation.middleware');
const { authenticateAny } = require('../middlewares/jwt');
const { validatorNewCreate, validatorNewUpdate } = require('../validators/new.validator');
const { handleValidationResult } = require('../middlewares/expressValidatorResult');

const router = Router();

// ✅ ORDEN CORRECTO: Rutas específicas PRIMERO, genéricas AL FINAL

// 1. Rutas especiales sin parámetros dinámicos
// GET /api/news/trending - Obtener noticias trending (más vistos)
router.get('/trending', getTrendingNews);

// GET /api/news/latest - Obtener noticias recientes
router.get('/latest', getLatestNews);

// 2. Rutas específicas con patrones definidos (ANTES de /:id)
// GET /api/news/search/:query - Buscar noticias
router.get('/search/:query', searchNews);

// GET /api/news/category/:categoryId - Obtener noticias por categoría
router.get('/category/:categoryId', getNewsByCategory);

// GET /api/news/state/:stateId - Obtener noticias por estado
router.get('/state/:stateId', getNewsByState);

// 3. Rutas genéricas (AL FINAL)
// GET /api/news/:id - Obtener noticia por ID
router.get('/:id', validateId, getNewById);

// GET /api/news - Obtener todas las noticias
router.get('/', getAllNews);

// POST /api/news - Crear nueva noticia
router.post('/', authenticateAny, validatorNewCreate, handleValidationResult, validateNewsData, createNew);

// PUT /api/news/:id - Actualizar noticia
router.put('/:id', authenticateAny, validatorNewUpdate, handleValidationResult, validateId, updateNew);

// DELETE /api/news/:id - Eliminar noticia (soft delete)
router.delete('/:id', authenticateAny, validateId, deleteNew);

module.exports = router;