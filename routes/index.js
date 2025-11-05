const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
require('dotenv').config();
const REQ_LIMIT = process.env.REQ_LIMIT;
const { getForm, createAluno } = require('../controllers/alunoController');

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

router.post('/adm', (req, res) => {
    res.send('Login do admnistrador');
});

router.get('/adm', (req, res) => {
    res.send('Visualização dos gráficos');
});

module.exports = router;