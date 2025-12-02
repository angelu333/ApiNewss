const { check } = require('express-validator');
const { User } = require('../models/UserModel');

const validatorLogin = [
    check('correo').notEmpty().withMessage('El campo correo es requerido').isEmail().withMessage('El campo correo debe ser un correo válido'),
    check('contraseña').notEmpty().withMessage('El campo contraseña es requerido')
];

const validatorRegister = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio').isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio').isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),
    check('nick').notEmpty().withMessage('El campo nick es obligatorio').isLength({ min: 2, max: 20 }).withMessage('El campo debe tener entre 2 y 20 caracteres'),
    check('correo').notEmpty().withMessage('El campo correo es obligatorio').isEmail().withMessage('El campo correo debe ser un correo valido')
        .custom((value) => {
            return User.findOne({ where: { correo: value } }).then(user => {
                if (user) throw new Error('Ya existe un usuario con este correo');
            });
        }),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio').isLength({ min: 8 }).withMessage('El campo debe tener minimo 8 caracteres')
];

module.exports = { validatorLogin, validatorRegister };
