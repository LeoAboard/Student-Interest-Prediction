const { body } = require('express-validator');

async function generalValidator() {
    body('nome').isLength({ min: 2, max: 100 }).withMessage("O tamanho do nome é inválido");

    //to-do -> validar email, telefone, e dados "estaticos" (genero, rede_social, interesse, tipo)
};

module.exports = generalValidator;