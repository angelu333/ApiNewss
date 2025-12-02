const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
} = require('../controllers/users.controller');
const { validateUserData, validateId } = require('../middlewares/validation.middleware');
const { authenticateAdmin } = require('../middlewares/jwt');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/user.validator');
const { handleValidationResult } = require('../middlewares/expressValidatorResult');

const router = Router();

// ✅ ORDEN CORRECTO: Rutas específicas PRIMERO, genéricas AL FINAL

// 1. Rutas con patrones específicos (ANTES de /:id)
// GET /api/users/email/:email - Obtener usuario por email
router.get('/email/:email', getUserByEmail);

// 2. Rutas generales
// GET /api/users - Obtener todos los usuarios
router.get('/', authenticateAdmin, getAllUsers);

// 3. Rutas con parámetros genéricos (AL FINAL)
// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', validateId, getUserById);

// POST /api/users - Crear nuevo usuario
router.post('/', authenticateAdmin, validatorUserCreate, handleValidationResult, validateUserData, createUser);

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', authenticateAdmin, validatorUserUpdate, handleValidationResult, validateId, updateUser);

// DELETE /api/users/:id - Eliminar usuario (soft delete)
router.delete('/:id', authenticateAdmin, validateId, deleteUser);

module.exports = router;