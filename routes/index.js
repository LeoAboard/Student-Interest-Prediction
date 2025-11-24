const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { authToken } = require('../middlewares/auth');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const REQ_LIMIT = process.env.REQ_LIMIT;
const { getForm, createAluno } = require('../controllers/alunoController');
const { logout, register, login, exibirGraficos } = require('../controllers/admController');
const generalValidator = require('../validators/generalValidator');
const validate = require('../middlewares/validator');

const app = express();
app.use(cookieParser());
app.use(router);
const frontendPath = path.join(__dirname, "..", "Frontend");
app.use(express.static(frontendPath));

/*=========SEGURANÇA DE REQUISIÇÃO==========*/

const reqLimit = rateLimit({
    windowMs: 60 * 1000,
    max: REQ_LIMIT,
    message: 'Você enviou muitas requisições, tente novamente mais tarde'
});

/*==============ROTAS USUÁRIO=============*/

router.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, "home.html"));
});

router.get('/form', reqLimit, getForm);

router.get('/formulario', (req, res) => {
    res.sendFile(path.join(frontendPath, "formulario.html"));
});

router.post('/formulario', reqLimit, generalValidator(), validate, createAluno);

/*===============ROTAS ADM===============*/

router.post('/register', reqLimit, register); //essa rota vai morrer mais tarde

router.get('/login', (req, res) => {
    res.sendFile(path.join(frontendPath, "login.html"));
});

router.post('/login', reqLimit, login);

router.get('/adm', authToken, (req, res) => {
    res.sendFile(path.join(frontendPath, "adm.html"));
});

router.post('/adm', authToken, exibirGraficos);

router.post('/logout', authToken, logout);

module.exports = app;