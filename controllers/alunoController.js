const Aluno = require("../models/Aluno");
const Escolaridade = require("../models/Escolaridade");
const Cidade = require("../models/Cidade");

async function getForm(req, res) {
    try {    
        const escolaridade = await Escolaridade.findAll();
        const cidade = await Cidade.findAll({
            attributes: ['nome', 'id']
        });

       return res.json({
        escolaridade,
        cidade
       });
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno` });
    }
};

async function createAluno(req, res) {
    try {
        const { 
            nome,
            data_nasc,
            genero,
            instituicao,
            consentimento,
            cidade_id,
            escolaridade_id            
        } = req.body;

        if(!data_nasc || !genero || !instituicao || !cidade_id || !escolaridade_id)  
            return res.status(400).json({ error: "O formulário está incompleto"});

        await Aluno.create({
            nome,
            data_nasc,
            genero,
            instituicao,
            consentimento,
            cidade_id,
            escolaridade_id
        });

        return res.status(201).json({ sucess: "Informações enviadas!" })
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno` });
    }
};

module.exports = { getForm, createAluno };