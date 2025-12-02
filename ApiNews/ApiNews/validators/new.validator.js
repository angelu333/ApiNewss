const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
    // categoria_id es obligatorio y debe referenciar una categoría activa
    check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom(value => Category.findOne({ where: { id: value, activo: true } }).then(c => { if (!c) throw new Error('No existe una categoria con ese id'); })),
    // usuario_id no es obligatorio en el body: se obtiene del token (usuario autenticado)
    // estado_id es obligatorio y debe referenciar un estado activo
    check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom(value => State.findOne({ where: { id: value, activo: true } }).then(s => { if (!s) throw new Error('No existe una estado con ese id'); })),
    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('slug').optional().isLength({ min: 2 }).withMessage('El campo slug debe tener al menos 2 caracteres').matches(/^[a-z0-9-]+$/).withMessage('El slug debe contener solo letras minúsculas, números y guiones'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    check('fecha_publicacion').notEmpty().withMessage('El campo fecha_publicacion es obligatorio').isISO8601().withMessage('El campo fecha_publicacion debe ser una fecha válida (ISO 8601)'),
    check('imagen').notEmpty().withMessage('El campo imagen es obligatorio').isBase64().withMessage('El campo imagen debe ser un Base64'),
    check('estado_publicacion').optional().isIn(['borrador', 'publicado', 'archivado']).withMessage('El campo estado_publicacion debe ser: borrador, publicado o archivado'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano')
];

const validatorNewUpdate = [
    check('categoria_id').optional().isInt().withMessage('El campo categoria_id debe ser un numero entero'),
    // No permitir cambiar usuario_id desde el body en una actualización estándar
    check('estado_id').optional().isInt().withMessage('El campo estado_id debe ser un numero entero'),
    check('titulo').optional().isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('slug').optional().isLength({ min: 2 }).withMessage('El campo slug debe tener al menos 2 caracteres').matches(/^[a-z0-9-]+$/).withMessage('El slug debe contener solo letras minúsculas, números y guiones'),
    check('descripcion').optional().isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    check('fecha_publicacion').optional().isISO8601().withMessage('El campo fecha_publicacion debe ser una fecha válida (ISO 8601)'),
    check('imagen').optional().isBase64().withMessage('El campo imagen debe ser un Base64'),
    check('estado_publicacion').optional().isIn(['borrador', 'publicado', 'archivado']).withMessage('El campo estado_publicacion debe ser: borrador, publicado o archivado'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano')
];

module.exports = { validatorNewCreate, validatorNewUpdate };
