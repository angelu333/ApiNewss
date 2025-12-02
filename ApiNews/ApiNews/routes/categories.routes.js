const { Router } = require('express');
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const { validateCategoryData, validateId } = require('../middlewares/validation.middleware');
const { authenticateAdmin } = require('../middlewares/jwt');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/category.validator');
const { handleValidationResult } = require('../middlewares/expressValidatorResult');

const router = Router();

// GET /api/categories - Obtener todas las categorías
router.get('/', getAllCategories);

// GET /api/categories/:id - Obtener categoría por ID
router.get('/:id', validateId, getCategoryById);

// POST /api/categories - Crear nueva categoría
router.post('/', authenticateAdmin, validatorCategoryCreate, handleValidationResult, validateCategoryData, createCategory);

// PUT /api/categories/:id - Actualizar categoría
router.put('/:id', authenticateAdmin, validatorCategoryUpdate, handleValidationResult, validateId, validateCategoryData, updateCategory);

// DELETE /api/categories/:id - Eliminar categoría (soft delete)
router.delete('/:id', authenticateAdmin, validateId, deleteCategory);

module.exports = router;