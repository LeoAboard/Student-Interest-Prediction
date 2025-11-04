const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const rotas = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', rotas);

const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log(`Servidor operando em: http://localhost:${PORT}/`)
});