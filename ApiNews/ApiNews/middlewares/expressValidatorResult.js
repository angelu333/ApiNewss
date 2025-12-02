const { validationResult } = require('express-validator');

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    next();
};

module.exports = { handleValidationResult };
