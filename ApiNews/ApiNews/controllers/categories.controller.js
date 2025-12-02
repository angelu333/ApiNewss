const categoryService = require('../services/categories.service');

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: 'Categorías obtenidas correctamente',
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        res.status(200).json({
            success: true,
            message: 'Categoría obtenida correctamente',
            data: category
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({
            success: true,
            message: 'Categoría creada correctamente',
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.updateCategory(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Categoría actualizada correctamente',
            data: category
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};