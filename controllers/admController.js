const bcrypt = require("bcryptjs");
const { generateToken } = require('../middlewares/auth');
const Adm = require("../models/Adm");
const Database = require("../models/Database");
const { json } = require("sequelize");
require('dotenv').config();

async function register(req, res){
    try {
        const { usuario, senha } = req.body;
        
        const hash = await bcrypt.hash(senha, 10);
        Database.sequelize.query(
            'INSERT INTO admin (usuario, password) VALUES ($usuario, $hash)',
            {
                bind: { usuario, hash },
                type: Database.Sequelize.QueryTypes.INSERT
            }
        );

        return res.status(201).json({ success: "Informações enviadas!" });
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

async function login(req, res) {
    try{
        const { usuario, senha } = req.body;

        const adm = await Adm.findOne({ where: { usuario } });
        if(!adm) return res.status(403).json({ error: "Usuário ou senha incorretos" });

        const valid = await bcrypt.compare(senha, adm.password);
        if (!valid) return res.status(403).json({ error: "Usuário ou senha incorretos" });

        const token = generateToken(adm.id);

        res.cookie('token', token, {         
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        })

        return res.status(201).json({ message: "Login bem sucedido!" });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

async function exibirGraficos(req, res) {
    try{
        const { ano_limite } = req.body;

        const busca = await fetch(process.env.URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.SERVICE_TOKEN
            },
            body: JSON.stringify({ ano_limite })
        });

        if(!busca){
            throw new Error("Erro ao buscar os gráficos");
        }

        const resposta = await busca.text();

        return res.status(201).json({ message: resposta });
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

async function logout(req, res) {
    try{
        res.clearCookie("token");

        return res.status(201).json({ message: "Até mais!" });
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

module.exports = { logout, register, login, exibirGraficos };