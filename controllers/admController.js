const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Adm = require("../models/Adm");
require('dotenv').config();

async function login(req, res) {
    try{
        const { email, senha } = req.body;

        const adm = await Adm.findOne({ where: { email } });
        if(!adm) return res.status(403).json({ error: "Usuário ou senha incorretos" });

        const valid = await bcrypt.compare(senha, adm.password);
        if (!valid) return res.status(403).json({ error: "Usuário ou senha incorretos" });

        const token = jwt.sign({ id: adm.id, email: adm.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login bem-sucedido" });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

async function exibirGraficos(req, res) {
    try{
        const { ano_limite } = req.body;

        const resp = await fetch("http://127.0.0.1:5000/processar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ano_limite }),
        });

        if (!resp.ok) {
            const text = await resp.text();
            console.error("Erro do Flask:", text);  
            throw new Error(`Flask retornou ${resp.status}`);
          }

        const resultado = await resp.json();
        res.json(resultado);
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

module.exports = { login, exibirGraficos };