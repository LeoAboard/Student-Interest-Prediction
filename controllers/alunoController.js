const Aluno = require("../models/Aluno");
const Escolaridade = require("../models/Escolaridade");
const Cidade = require("../models/Cidade");
const Preferencia = require("../models/Preferencia");
const Curso = require("../models/Curso");
const Contato = require("../models/Contato");
const Estado = require("../models/Estado")

async function getForm(req, res) {
    try {    
        const escolaridade = await Escolaridade.findAll();
        const curso = await Curso.findAll();
        const cidade = await Cidade.findAll({
            attributes: ['id', 'nome', 'estado_id']
        });
        const uf = await Estado.findAll();

       return res.json({
        escolaridade,
        cidade,
        curso,
        uf
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
            escolaridade_id,
            area_atuacao,
            turno,
            rede_social,
            interesse,
            faz_enem,
            curso_id,
            observacao,
            tipo,
            contato         
        } = req.body;

        if(!data_nasc || !genero || !instituicao || !cidade_id || !escolaridade_id)  
            return res.status(400).json({ error: "O formulário está incompleto"});

        const instituicaoLow = instituicao.toLowerCase();

        const aluno = await Aluno.create({
            nome,
            data_nasc,
            genero,
            instituicao: instituicaoLow,
            consentimento,
            cidade_id,
            escolaridade_id
        });

        await Preferencia.create({
            aluno_id: aluno?.id,
            area_atuacao,
            turno,
            rede_social,
            interesse,
            faz_enem,
            curso_id,
            observacao
        });

        await Contato.create({
            aluno_id: aluno?.id,
            tipo,
            contato
        });

        return res.status(201).json({ success: "Informações enviadas!" });
    } catch(error) {
        return res.status(500).json({ error: `Ocorreu um erro interno ${error}` });
    }
};

module.exports = { getForm, createAluno };