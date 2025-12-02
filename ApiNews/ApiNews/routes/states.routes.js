const { Router } = require('express');
const {
    getAllStates,
    getStateById,
    createState,
    updateState,
    deleteState
} = require('../controllers/states.controller');
const { validateStateData, validateId } = require('../middlewares/validation.middleware');
const { authenticateAdmin } = require('../middlewares/jwt');
const { validatorStateRequire, validatorStateOptional } = require('../validators/state.validator');
const { handleValidationResult } = require('../middlewares/expressValidatorResult');

const router = Router();

// GET /api/states - Obtener todos los estados
router.get('/', getAllStates);

// GET /api/states/:id - Obtener estado por ID
router.get('/:id', validateId, getStateById);

// POST /api/states - Crear nuevo estado
router.post('/', authenticateAdmin, validatorStateRequire, handleValidationResult, validateStateData, createState);

// PUT /api/states/:id - Actualizar estado
router.put('/:id', authenticateAdmin, validatorStateOptional, handleValidationResult, validateId, validateStateData, updateState);

// DELETE /api/states/:id - Eliminar estado (soft delete)
router.delete('/:id', validateId, deleteState);

module.exports = router;