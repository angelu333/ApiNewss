const { Category } = require('../models/CategoryModel');

class CategoryService {
    async getAllCategories() {
        try {
            return await Category.findAll({
                where: { activo: true },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener categorías: ${error.message}`);
        }
    }

    async getCategoryById(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw new Error('Categoría no encontrada');
            }
            return category;
        } catch (error) {
            throw new Error(`Error al obtener categoría: ${error.message}`);
        }
    }

    async createCategory(categoryData) {
        try {
            const currentDate = new Date();
            const dataWithAudit = {
                ...categoryData,
                FechaAlta: currentDate,
                FechaMod: currentDate,
                FechaBaja: currentDate
            };
            
            return await Category.create(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al crear categoría: ${error.message}`);
        }
    }

    async updateCategory(id, categoryData) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw new Error('Categoría no encontrada');
            }
            
            const dataWithAudit = {
                ...categoryData,
                FechaMod: new Date(),
                UserMod: categoryData.UserMod || 'Admin'
            };
            
            return await category.update(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al actualizar categoría: ${error.message}`);
        }
    }

    async deleteCategory(id) {
        try {
            const category = await Category.findByPk(id);
            if (!category) {
                throw new Error('Categoría no encontrada');
            }
            
            // Soft delete - marcar como inactivo
            await category.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Categoría eliminada correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar categoría: ${error.message}`);
        }
    }
}

module.exports = new CategoryService();