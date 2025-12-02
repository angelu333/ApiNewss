const { Router } = require('express');
const {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profiles.controller');
const { validateProfileData, validateId } = require('../middlewares/validation.middleware');

const router = Router();

// GET /api/profiles - Obtener todos los perfiles
router.get('/', getAllProfiles);

// GET /api/profiles/:id - Obtener perfil por ID
router.get('/:id', validateId, getProfileById);

// POST /api/profiles - Crear nuevo perfil
router.post('/', validateProfileData, createProfile);

// PUT /api/profiles/:id - Actualizar perfil
router.put('/:id', validateId, validateProfileData, updateProfile);

// DELETE /api/profiles/:id - Eliminar perfil
router.delete('/:id', validateId, deleteProfile);

module.exports = router;