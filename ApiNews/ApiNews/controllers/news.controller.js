const newsService = require('../services/news.service');

// Función auxiliar para generar slug a partir del título
const generateSlug = (titulo) => {
    return titulo
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
        .replace(/[\s_]+/g, '-') // Reemplazar espacios/underscores con guiones
        .replace(/^-+|-+$/g, '') // Remover guiones al inicio/final
        .substring(0, 100); // Limitar longitud
};

const getAllNews = async (req, res) => {
    try {
        const news = await newsService.getAllNews();
        res.status(200).json({
            success: true,
            message: 'Noticias obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNewById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await newsService.getNewById(id);
        res.status(200).json({
            success: true,
            message: 'Noticia obtenida correctamente',
            data: news
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const createNew = async (req, res) => {
    try {
        // Asignar el usuario autenticado como autor de la noticia (evitar confiar en el body)
        const newsData = { ...req.body };
        if (req.usuario && req.usuario.id) {
            newsData.usuario_id = req.usuario.id;
        }

        // Auto-generar slug si no se proporciona
        if (!newsData.slug) {
            newsData.slug = generateSlug(newsData.titulo);
        }

        // Si no se proporciona estado_publicacion, se usa 'borrador' por defecto
        if (!newsData.estado_publicacion) {
            newsData.estado_publicacion = 'borrador';
        }

        const news = await newsService.createNew(newsData);
        res.status(201).json({
            success: true,
            message: 'Noticia creada correctamente',
            data: news
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateNew = async (req, res) => {
    try {
        const { id } = req.params;
        // Evitar que el body cambie el autor de la noticia
        const updateData = { ...req.body };
        delete updateData.usuario_id;
        const news = await newsService.updateNew(id, updateData);
        res.status(200).json({
            success: true,
            message: 'Noticia actualizada correctamente',
            data: news
        });
    } catch (error) {
        const statusCode = error.message.includes('no encontrada') ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const deleteNew = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await newsService.deleteNew(id);
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

const getNewsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const news = await newsService.getNewsByCategory(categoryId);
        res.status(200).json({
            success: true,
            message: 'Noticias por categoría obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNewsByState = async (req, res) => {
    try {
        const { stateId } = req.params;
        const news = await newsService.getNewsByState(stateId);
        res.status(200).json({
            success: true,
            message: 'Noticias por estado obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTrendingNews = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const news = await newsService.getTrendingNews(limit);
        res.status(200).json({
            success: true,
            message: 'Noticias trending obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getLatestNews = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const news = await newsService.getLatestNews(limit);
        res.status(200).json({
            success: true,
            message: 'Noticias más recientes obtenidas correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchNews = async (req, res) => {
    try {
        const { query } = req.params;
        const news = await newsService.searchNews(query);
        res.status(200).json({
            success: true,
            message: 'Resultados de búsqueda obtenidos correctamente',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllNews,
    getNewById,
    createNew,
    updateNew,
    deleteNew,
    getNewsByCategory,
    getNewsByState,
    getTrendingNews,
    getLatestNews,
    searchNews
};