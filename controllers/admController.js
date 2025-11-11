import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Adm from "../models/Adm";
import dotenv from "dotenv";
dotenv.config();

async function login(req, res){
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

async function exibirGraficos(req, res){
    try{
        const { ano_limite } = req.body;

        

        return res.status(201).json({ success: "Sucesso!" })
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
}

module.exports = { login, exibirGraficos };