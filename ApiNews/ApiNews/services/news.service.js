const { New } = require('../models/NewModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

class NewsService {
    async getAllNews() {
        try {
            return await New.findAll({
                where: { activo: true },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre', 'descripcion']
                    },
                    {
                        model: State,
                        as: 'estado',
                        attributes: ['id', 'nombre', 'abreviacion']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick'],
                        include: [{
                            model: Profile,
                            as: 'perfil',
                            attributes: ['id', 'nombre']
                        }]
                    }
                ],
                order: [['fecha_publicacion', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener noticias: ${error.message}`);
        }
    }

    async getNewById(id) {
        try {
            const news = await New.findByPk(id, {
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre', 'descripcion']
                    },
                    {
                        model: State,
                        as: 'estado',
                        attributes: ['id', 'nombre', 'abreviacion']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar', 'verificado'],
                        include: [{
                            model: Profile,
                            as: 'perfil',
                            attributes: ['id', 'nombre']
                        }]
                    }
                ]
            });
            
            if (!news) {
                throw new Error('Noticia no encontrada');
            }

            // Incrementar contador de visitas
            await news.increment('visitas');
            
            return news;
        } catch (error) {
            throw new Error(`Error al obtener noticia: ${error.message}`);
        }
    }

    async createNew(newsData) {
        try {
            const currentDate = new Date();
            const dataWithAudit = {
                ...newsData,
                FechaAlta: currentDate,
                FechaMod: currentDate,
                FechaBaja: currentDate
            };
            
            const news = await New.create(dataWithAudit);
            
            // Retornar la noticia con las relaciones incluidas
            return await this.getNewById(news.id);
        } catch (error) {
            throw new Error(`Error al crear noticia: ${error.message}`);
        }
    }

    async updateNew(id, newsData) {
        try {
            const news = await New.findByPk(id);
            if (!news) {
                throw new Error('Noticia no encontrada');
            }
            
            const dataWithAudit = {
                ...newsData,
                FechaMod: new Date(),
                UserMod: newsData.UserMod || 'Admin'
            };
            
            await news.update(dataWithAudit);
            
            // Retornar la noticia actualizada con las relaciones incluidas
            return await this.getNewById(id);
        } catch (error) {
            throw new Error(`Error al actualizar noticia: ${error.message}`);
        }
    }

    async deleteNew(id) {
        try {
            const news = await New.findByPk(id);
            if (!news) {
                throw new Error('Noticia no encontrada');
            }
            
            // Soft delete - marcar como inactivo
            await news.update({
                activo: false,
                FechaBaja: new Date(),
                UserBaja: 'Admin'
            });
            
            return { message: 'Noticia eliminada correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar noticia: ${error.message}`);
        }
    }

    async getNewsByCategory(categoryId) {
        try {
            return await New.findAll({
                where: { 
                    categoria_id: categoryId,
                    activo: true 
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre', 'descripcion']
                    },
                    {
                        model: State,
                        as: 'estado',
                        attributes: ['id', 'nombre', 'abreviacion']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick']
                    }
                ],
                order: [['fecha_publicacion', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener noticias por categoría: ${error.message}`);
        }
    }

    async getNewsByState(stateId) {
        try {
            return await New.findAll({
                where: { 
                    estado_id: stateId,
                    activo: true 
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre', 'descripcion']
                    },
                    {
                        model: State,
                        as: 'estado',
                        attributes: ['id', 'nombre', 'abreviacion']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick']
                    }
                ],
                order: [['fecha_publicacion', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener noticias por estado: ${error.message}`);
        }
    }

    async getTrendingNews(limit = 10) {
        try {
            return await New.findAll({
                where: { 
                    activo: true,
                    estado_publicacion: 'publicado'
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar']
                    }
                ],
                order: [['visitas', 'DESC']],
                limit: limit
            });
        } catch (error) {
            throw new Error(`Error al obtener noticias trending: ${error.message}`);
        }
    }

    async getLatestNews(limit = 10) {
        try {
            return await New.findAll({
                where: {
                    activo: true,
                    estado_publicacion: 'publicado'
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar']
                    }
                ],
                order: [['fecha_publicacion', 'DESC']],
                limit: limit
            });
        } catch (error) {
            throw new Error(`Error al obtener noticias recientes: ${error.message}`);
        }
    }

    async searchNews(query) {
        try {
            const { Op } = require('sequelize');
            return await New.findAll({
                where: {
                    [Op.or]: [
                        { titulo: { [Op.like]: `%${query}%` } },
                        { descripcion: { [Op.like]: `%${query}%` } }
                    ],
                    activo: true,
                    estado_publicacion: 'publicado'
                },
                include: [
                    {
                        model: Category,
                        as: 'categoria',
                        attributes: ['id', 'nombre']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar']
                    }
                ],
                order: [['fecha_publicacion', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Error al buscar noticias: ${error.message}`);
        }
    }
}

module.exports = new NewsService();