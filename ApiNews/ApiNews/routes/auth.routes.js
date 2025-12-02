const { Router } = require('express');
const { login, register } = require('../controllers/auth.controller');
const { validatorLogin, validatorRegister } = require('../validators/auth.validator');

const router = Router();

router.post('/login', validatorLogin, login);
router.post('/register', validatorRegister, register);

module.exports = router;
