const validateProfileData = (req, res, next) => {
    const { nombre } = req.body;
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El nombre del perfil es obligatorio'
        });
    }
    
    if (nombre.length > 50) {
        return res.status(400).json({
            success: false,
            message: 'El nombre del perfil no puede exceder 50 caracteres'
        });
    }
    
    next();
};

const validateStateData = (req, res, next) => {
    const { nombre, abreviacion } = req.body;
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El nombre del estado es obligatorio'
        });
    }
    
    if (!abreviacion || abreviacion.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'La abreviación del estado es obligatoria'
        });
    }
    
    if (nombre.length > 50) {
        return res.status(400).json({
            success: false,
            message: 'El nombre del estado no puede exceder 50 caracteres'
        });
    }
    
    if (abreviacion.length > 5) {
        return res.status(400).json({
            success: false,
            message: 'La abreviación del estado no puede exceder 5 caracteres'
        });
    }
    
    next();
};

const validateCategoryData = (req, res, next) => {
    const { nombre, descripcion } = req.body;
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El nombre de la categoría es obligatorio'
        });
    }
    
    if (!descripcion || descripcion.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'La descripción de la categoría es obligatoria'
        });
    }
    
    if (nombre.length > 50) {
        return res.status(400).json({
            success: false,
            message: 'El nombre de la categoría no puede exceder 50 caracteres'
        });
    }
    
    if (descripcion.length > 255) {
        return res.status(400).json({
            success: false,
            message: 'La descripción de la categoría no puede exceder 255 caracteres'
        });
    }
    
    next();
};

const validateUserData = (req, res, next) => {
    const { perfil_id, nombre, apellidos, nick, correo, contraseña } = req.body;
    
    if (!perfil_id || isNaN(perfil_id)) {
        return res.status(400).json({
            success: false,
            message: 'El ID del perfil es obligatorio y debe ser un número'
        });
    }
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El nombre del usuario es obligatorio'
        });
    }
    
    if (!apellidos || apellidos.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Los apellidos del usuario son obligatorios'
        });
    }
    
    if (!nick || nick.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El nick del usuario es obligatorio'
        });
    }
    
    if (!correo || correo.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El correo del usuario es obligatorio'
        });
    }
    
    if (!contraseña || contraseña.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'La contraseña del usuario es obligatoria'
        });
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({
            success: false,
            message: 'El formato del correo electrónico no es válido'
        });
    }
    
    next();
};

const validateNewsData = (req, res, next) => {
    const { categoria_id, estado_id, usuario_id, titulo, fecha_publicacion, descripcion, imagen } = req.body;
    
    if (!categoria_id || isNaN(categoria_id)) {
        return res.status(400).json({
            success: false,
            message: 'El ID de la categoría es obligatorio y debe ser un número'
        });
    }
    
    if (!estado_id || isNaN(estado_id)) {
        return res.status(400).json({
            success: false,
            message: 'El ID del estado es obligatorio y debe ser un número'
        });
    }
    
    // El usuario puede venir en el body (usuario_id) o ser tomado del token (req.usuario)
    if (!usuario_id || isNaN(usuario_id)) {
        if (req.usuario && req.usuario.id) {
            // Asignar el usuario autenticado al body para que el servicio lo use
            req.body.usuario_id = req.usuario.id;
        } else {
            return res.status(400).json({
                success: false,
                message: 'El ID del usuario es obligatorio y debe ser un número (o se requiere autenticación)'
            });
        }
    }
    
    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'El título de la noticia es obligatorio'
        });
    }
    
    if (!fecha_publicacion) {
        return res.status(400).json({
            success: false,
            message: 'La fecha de publicación es obligatoria'
        });
    }
    
    if (!descripcion || descripcion.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'La descripción de la noticia es obligatoria'
        });
    }
    
    if (!imagen || imagen.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'La imagen de la noticia es obligatoria'
        });
    }
    
    if (titulo.length > 50) {
        return res.status(400).json({
            success: false,
            message: 'El título no puede exceder 50 caracteres'
        });
    }
    
    if (descripcion.length > 1000) {
        return res.status(400).json({
            success: false,
            message: 'La descripción no puede exceder 1000 caracteres'
        });
    }
    
    next();
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un número válido'
        });
    }
    
    next();
};

module.exports = {
    validateProfileData,
    validateStateData,
    validateCategoryData,
    validateUserData,
    validateNewsData,
    validateId
};