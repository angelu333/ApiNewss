const { Profile } = require('../models/ProfileModel');

class ProfileService {
    async getAllProfiles() {
        try {
            return await Profile.findAll({
                order: [['id', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener perfiles: ${error.message}`);
        }
    }

    async getProfileById(id) {
        try {
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw new Error('Perfil no encontrado');
            }
            return profile;
        } catch (error) {
            throw new Error(`Error al obtener perfil: ${error.message}`);
        }
    }

    async createProfile(profileData) {
        try {
            return await Profile.create(profileData);
        } catch (error) {
            throw new Error(`Error al crear perfil: ${error.message}`);
        }
    }

    async updateProfile(id, profileData) {
        try {
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw new Error('Perfil no encontrado');
            }
            
            return await profile.update(profileData);
        } catch (error) {
            throw new Error(`Error al actualizar perfil: ${error.message}`);
        }
    }

    async deleteProfile(id) {
        try {
            const profile = await Profile.findByPk(id);
            if (!profile) {
                throw new Error('Perfil no encontrado');
            }
            
            await profile.destroy();
            return { message: 'Perfil eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar perfil: ${error.message}`);
        }
    }
}

module.exports = new ProfileService();