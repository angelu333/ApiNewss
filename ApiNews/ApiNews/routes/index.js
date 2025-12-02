const { Router } = require('express');
const profilesRouter = require('./profiles.routes');
const statesRouter = require('./states.routes');
const categoriesRouter = require('./categories.routes');
const usersRouter = require('./users.routes');
const newsRouter = require('./news.routes');
const authRouter = require('./auth.routes');
const commentsRouter = require('./comments.routes');
const favoritesRouter = require('./favorites.routes');

const router = Router();

// Rutas principales de la API
router.use('/profiles', profilesRouter);
router.use('/states', statesRouter);
router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);
router.use('/news', newsRouter);
router.use('/auth', authRouter);
router.use('/news', commentsRouter);
router.use('/users', favoritesRouter);

// Ruta de información de la API
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API de Noticias - Bienvenido',
        version: '1.0.0',
        endpoints: {
            profiles: '/api/profiles',
            states: '/api/states',
            categories: '/api/categories',
            users: '/api/users',
            news: '/api/news'
        },
        documentation: {
            base_url: req.protocol + '://' + req.get('host'),
            available_methods: ['GET', 'POST', 'PUT', 'DELETE']
        }
    });
});

module.exports = router;