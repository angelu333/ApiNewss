const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET || 'mi_llave_secreta';

const login = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }

    try {
        // Buscar usuario por correo
        const usuario = await User.findOne({
            where: {
                correo: request.body.correo,
                activo: true
            },
            // traer la contraseña para comparar, además de los datos públicos
            attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick', 'correo', 'contraseña']
        });

        if (!usuario) {
            return response.status(401).json({ message: 'Sin autorización' });
        }

        // Comparar contraseña
        const match = await bcrypt.compare(request.body.contraseña, usuario['contraseña']);
        if (!match) {
            return response.status(401).json({ message: 'Sin autorización' });
        }

        // No incluir la contraseña en el token
        const safeUsuario = {
            id: usuario.id,
            perfil_id: usuario.perfil_id,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            nick: usuario.nick,
            correo: usuario.correo
        };

        const token = jwt.sign({ usuario: safeUsuario }, secret, { expiresIn: '24h' });
        return response.status(200).json({ message: 'Login con éxito', token });
    } catch (err) {
        console.error('Auth login error:', err);
        return response.status(500).send('Error al consultar el dato');
    }
};

const register = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    try {
        // assign profile id 2 for contributors and set active
        request.body.perfil_id = 2;
        request.body.activo = true;

        // El hook del modelo se encargará de hashear la contraseña
        const newUser = await User.create(request.body);

        // No devolver la contraseña al cliente
        const { contraseña, ...safeUser } = newUser.toJSON();
        return response.status(201).json(safeUser);
    } catch (err) {
        console.error('Auth register error:', err);
        return response.status(500).send('Error al crear');
    }
};

module.exports = { login, register };
