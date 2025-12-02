const commentService = require('../services/comments.service');
const newsService = require('../services/news.service');

const createComment = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { contenido } = req.body;

        // Verificar que la noticia existe
        const news = await newsService.getNewById(newsId);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'Noticia no encontrada'
            });
        }

        const commentData = {
            noticia_id: parseInt(newsId),
            usuario_id: req.usuario.id,
            contenido: contenido,
            aprobado: false, // Los comentarios inician como pendientes de aprobación
            activo: true
        };

        const comment = await commentService.createComment(commentData);
        
        res.status(201).json({
            success: true,
            message: 'Comentario creado correctamente (pendiente de aprobación)',
            data: comment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getCommentsByNews = async (req, res) => {
    try {
        const { newsId } = req.params;
        const comments = await commentService.getAllCommentsByNewsId(newsId);
        res.status(200).json({
            success: true,
            message: 'Comentarios obtenidos correctamente',
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await commentService.deleteComment(commentId);
        res.status(200).json({
            success: true,
            message: 'Comentario eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const approveComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await commentService.approveComment(commentId);
        res.status(200).json({
            success: true,
            message: 'Comentario aprobado'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getPendingComments = async (req, res) => {
    try {
        const comments = await commentService.getPendingComments();
        res.status(200).json({
            success: true,
            message: 'Comentarios pendientes obtenidos',
            data: comments,
            total: comments.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createComment,
    getCommentsByNews,
    deleteComment,
    approveComment,
    getPendingComments
};
