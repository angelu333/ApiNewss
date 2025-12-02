const { Router } = require('express');
const {
    createComment,
    getCommentsByNews,
    deleteComment,
    approveComment,
    getPendingComments
} = require('../controllers/comments.controller');
const { authenticateAny, authenticateAdmin } = require('../middlewares/jwt');
const { handleValidationResult } = require('../middlewares/expressValidatorResult');
const { check } = require('express-validator');

const router = Router();

// ✅ ORDEN CORRECTO: Rutas específicas PRIMERO, genéricas AL FINAL

// 1. Rutas específicas con patrones literales (sin parámetros dinámicos al inicio)
// GET /api/news/comments/pending - Obtener comentarios pendientes de aprobación (requiere admin)
router.get('/comments/pending',
    authenticateAdmin,
    getPendingComments
);

// POST /api/news/comments/approve/:commentId - Aprobar comentario (requiere admin)
router.post('/comments/approve/:commentId',
    authenticateAdmin,
    approveComment
);

// 2. Rutas con parámetros dinámicos (DESPUÉS de las rutas específicas)
// GET /api/news/:newsId/comments - Obtener comentarios de una noticia
router.get('/:newsId/comments', getCommentsByNews);

// POST /api/news/:newsId/comments - Crear comentario en una noticia (requiere autenticación)
router.post('/:newsId/comments',
    authenticateAny,
    check('contenido')
        .notEmpty().withMessage('El contenido es obligatorio')
        .isLength({ min: 1, max: 2000 }).withMessage('El comentario debe tener entre 1 y 2000 caracteres'),
    handleValidationResult,
    createComment
);

// DELETE /api/news/:newsId/comments/:commentId - Eliminar comentario (requiere autenticación)
router.delete('/:newsId/comments/:commentId',
    authenticateAny,
    deleteComment
);

module.exports = router;
