const express = require('express');
const router = express.Router();
const criarAluno = require('../controllers/alunoController');

router.get('/', (req, res) => {
    res.send('Informações gerais sobre o curso');
});

router.get('/form', (req, res) => {
    res.send('Formulário para coleta de dados dos estudantes');
});

router.post('/form', criarAluno);

router.post('/adm', (req, res) => {
    res.send('Login do admnistrador');
});

router.get('/adm', (req, res) => {
    res.send('Visualização dos gráficos');
});

module.exports = router;