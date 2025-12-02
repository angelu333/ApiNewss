const userService = require('../services/users.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Usuarios obtenidos correctamente',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json({
            success: true,
            message: 'Usuario obtenido correctamente',
            data: user
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: 'Usuario creado correctamente',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.updateUser(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Usuario actualizado correctamente',
            data: user
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUser(id);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Usuario obtenido correctamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
};