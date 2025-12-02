const { State } = require('../models/StateModel');

class StateService {
    async getAllStates() {
        try {
            return await State.findAll({
                where: { activo: true },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener estados: ${error.message}`);
        }
    }

    async getStateById(id) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            return state;
        } catch (error) {
            throw new Error(`Error al obtener estado: ${error.message}`);
        }
    }

    async createState(stateData) {
        try {
            const currentDate = new Date();
            const dataWithAudit = {
                ...stateData,
                FechaAlta: currentDate,
                FechaMod: currentDate,
                FechaBaja: currentDate
            };
            
            return await State.create(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al crear estado: ${error.message}`);
        }
    }

    async updateState(id, stateData) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            
            const dataWithAudit = {
                ...stateData,
                FechaMod: new Date(),
                UserMod: stateData.UserMod || 'Admin'
            };
            
            return await state.update(dataWithAudit);
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }

    async deleteState(id) {
        try {
            const state = await State.findByPk(id);
            if (!state) {
                throw new Error('Estado no encontrado');
            }
            
            // Soft delete - marcar como inactivo
            await state.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Estado eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar estado: ${error.message}`);
        }
    }
}

module.exports = new StateService();