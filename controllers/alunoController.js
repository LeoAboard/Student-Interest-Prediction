const Aluno = require("../models/Aluno");

async function createAluno(req, res) {
    try {
        const { 
            nome,
            data_nasc,
            genero,
            instituicao,
            consentimento
        } = req.body();

        if(!data_nasc || !genero || !instituicao) 
            return res.status(400).json({ error: "O formulário está incompleto"});

        await Aluno.create({
            nome,
            data_nasc,
            genero,
            instituicao,
            consentimento
        });

        return res.status(201).json({ success: "Informações enviadas!" })
    } catch(error) {
        return res.status(500).json({ error: "Ocorreu um erro interno" });
    }
};

module.exports = createAluno;