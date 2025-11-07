const { body } = require('express-validator');

function generalValidator() {
    //nome
    return [
        body('nome').isLength({ min: 2, max: 100 }).withMessage("O tamanho do nome é inválido"),

        //to-do -> validar email, telefone, e dados "estaticos" (genero, rede_social, interesse, tipo)

        //tipo do contato
        body('tipo').isIn(['email', 'telefone']).withMessage("O tipo é inválido"),

        //email
        body('email').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage("O e-mail informado é inválido"),

        //telefone
        body('telefone').matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/).withMessage("O telefone informado é inválido"),

        //genero
        body('genero').isIn(['masculino', 'feminino', 'prefiro nao informar']).withMessage("O gênero é inválido"),


        //rede_social
        body('rede_social').isIn(['Instagram', 'Facebook', 'TikTok', 'Twitter', 'Whatsapp']).withMessage("A rede social é inválida"),

        //interesse

    ];
}

module.exports = generalValidator;