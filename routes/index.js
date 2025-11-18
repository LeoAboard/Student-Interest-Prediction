const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { authToken } = require("../middlewares/auth");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const REQ_LIMIT = process.env.REQ_LIMIT;
const { getForm, createAluno } = require('../controllers/alunoController');
const { logout, register, login, exibirGraficos } = require('../controllers/admController');

const app = express();
app.use(cookieParser());
app.use(router);

/*=========SEGURANÇA DE REQUISIÇÃO==========*/

const reqLimit = rateLimit({
    windowMs: 60 * 1000,
    max: REQ_LIMIT,
    message: 'Você enviou muitas requisições, tente novamente mais tarde'
});

/*==========================================*/

router.get('/', (req, res) => {
    res.send('Informações gerais sobre o curso');
});

router.get('/form', reqLimit, getForm);

router.post('/form', reqLimit, createAluno);

router.post('/register', register);

router.post('/adm', login);

router.get('/adm', authToken, exibirGraficos);

router.post('/logout', authToken, logout);

module.exports = app;