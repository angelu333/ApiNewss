const profileService = require('../services/profiles.service');

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json({
            success: true,
            message: 'Perfiles obtenidos correctamente',
            data: profiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await profileService.getProfileById(id);
        res.status(200).json({
            success: true,
            message: 'Perfil obtenido correctamente',
            data: profile
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const createProfile = async (req, res) => {
    try {
        const profile = await profileService.createProfile(req.body);
        res.status(201).json({
            success: true,
            message: 'Perfil creado correctamente',
            data: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await profileService.updateProfile(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Perfil actualizado correctamente',
            data: profile
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrado') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await profileService.deleteProfile(id);
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

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
};