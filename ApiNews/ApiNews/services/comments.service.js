const { Comment } = require('../models/CommentModel');
const { User } = require('../models/UserModel');

class CommentService {
    async getAllCommentsByNewsId(newsId) {
        try {
            return await Comment.findAll({
                where: {
                    noticia_id: newsId,
                    activo: true,
                    aprobado: true // solo comentarios aprobados
                },
                include: [{
                    model: User,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar', 'verificado']
                }],
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener comentarios: ${error.message}`);
        }
    }

    async createComment(commentData) {
        try {
            const comment = await Comment.create(commentData);
            return await Comment.findByPk(comment.id, {
                include: [{
                    model: User,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'apellidos', 'nick', 'avatar', 'verificado']
                }]
            });
        } catch (error) {
            throw new Error(`Error al crear comentario: ${error.message}`);
        }
    }

    async deleteComment(commentId) {
        try {
            const comment = await Comment.findByPk(commentId);
            if (!comment) {
                throw new Error('Comentario no encontrado');
            }
            await comment.update({
                activo: false
            });
            return { message: 'Comentario eliminado correctamente' };
        } catch (error) {
            throw new Error(`Error al eliminar comentario: ${error.message}`);
        }
    }

    async approveComment(commentId) {
        try {
            const comment = await Comment.findByPk(commentId);
            if (!comment) {
                throw new Error('Comentario no encontrado');
            }
            await comment.update({
                aprobado: true
            });
            return { message: 'Comentario aprobado' };
        } catch (error) {
            throw new Error(`Error al aprobar comentario: ${error.message}`);
        }
    }

    async getPendingComments() {
        try {
            return await Comment.findAll({
                where: {
                    aprobado: false,
                    activo: true
                },
                include: [{
                    model: User,
                    as: 'autor',
                    attributes: ['id', 'nombre', 'apellidos', 'nick']
                }],
                order: [['createdAt', 'ASC']]
            });
        } catch (error) {
            throw new Error(`Error al obtener comentarios pendientes: ${error.message}`);
        }
    }
}

module.exports = new CommentService();
