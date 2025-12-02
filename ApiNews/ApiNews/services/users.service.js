const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

class UserService {
    async getAllUsers() {
        try {
            return await User.findAll({
                where: { activo: true },
                include: [{
                    model: Profile,
                    as: 'perfil',
                    attributes: ['id', 'nombre']
                }],
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id, {
                include: [{
                    model: Profile,
                    as: 'perfil',
                    attributes: ['id', 'nombre']
                }]
            });
            
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    async createUser(userData) {
        try {
            const currentDate = new Date();
            const dataWithAudit = {
                ...userData,
                FechaAlta: currentDate,
                FechaMod: currentDate,
                FechaBaja: currentDate
            };
            
            const user = await User.create(dataWithAudit);
            
            // Retornar el usuario con el perfil incluido
            return await this.getUserById(user.id);
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async updateUser(id, userData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            const dataWithAudit = {
                ...userData,
                FechaMod: new Date(),
                UserMod: userData.UserMod || 'Admin'
            };
            
            await user.update(dataWithAudit);
            
            // Retornar el usuario actualizado con el perfil incluido
            return await this.getUserById(id);
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            
            // Soft delete - marcar como inactivo
            await user.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({
                where: { correo: email, activo: true },
                include: [{
                    model: Profile,
                    as: 'perfil',
                    attributes: ['id', 'nombre']
                }]
            });
        } catch (error) {
            throw new Error(`Error al buscar usuario por email: ${error.message}`);
        }
    }
}

module.exports = new UserService();