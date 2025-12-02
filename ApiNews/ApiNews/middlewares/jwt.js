const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const secret = JWT_SECRET || 'mi_llave_secreta';

const extractToken = (authorization_header) => {
    if (!authorization_header) return null;
    const parts = authorization_header.split(' ');
    if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
    return null;
}

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = extractToken(authorization_header);

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded && decoded.usuario && decoded.usuario.perfil_id === 1) {
            req.usuario = decoded.usuario;
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = extractToken(authorization_header);

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización' });
        }
        if (decoded && decoded.usuario) {
            req.usuario = decoded.usuario;
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización' });
        }

    });
}

module.exports = {
    authenticateAdmin,
    authenticateAny
};
