const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

const validatorUserCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('nick').notEmpty().withMessage('El campo nick es obligatorio').isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),
    check('correo').notEmpty().withMessage('El campo correo es obligatorio').isEmail().withMessage('El campo correo debe ser un correo valido')
        .custom(value => User.findOne({ where: { correo: value } }).then(u => { if (u) throw new Error('Ya existe un usuario con el mismo correo'); })),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio').isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),
    check('perfil_id').notEmpty().withMessage('El campo perfil id es obligatorio').isInt().withMessage('El campo perfil id debe ser numero')
        .custom(value => Profile.findOne({ where: { id: value } }).then(p => { if (!p) throw new Error('No existe un perfil con ese id'); }))
];

const validatorUserUpdate = [
    check('nombre').optional().isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('apellidos').optional().isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('nick').optional().isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),
    check('contraseña').optional().isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres'),
    check('perfil_id').optional().isInt().withMessage('El campo perfil id debe ser numero').custom(value => Profile.findOne({ where: { id: value } }).then(p => { if (!p) throw new Error('No existe un perfil con ese id'); }))
];

module.exports = { validatorUserCreate, validatorUserUpdate };
