const { body } = require('express-validator');

function generalValidator() {
    //nome
    return [
        body('nome').isLength({ min: 2, max: 100 }).withMessage("O tamanho do nome é inválido"),

        //tipo do contato
        body('tipo').isIn(['email', 'telefone']).withMessage("O tipo é inválido"),

        body('email')
            .optional({ checkFalsy: true })
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
            .withMessage("O e-mail informado é inválido"),

        body('telefone')
            .optional({ checkFalsy: true })
            .matches(/^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/)
            .withMessage("O telefone informado é inválido"),

        //genero
        body('genero').isIn(['masculino', 'feminino', 'prefiro nao informar']).withMessage("O gênero é inválido"),

        //rede_social
        body('rede_social').isIn(['Instagram', 'Facebook', 'TikTok', 'Twitter', 'Whatsapp']).withMessage("A rede social é inválida"),

        //curso
        body('curso_id').isIn([1, 2, 3, 4]).withMessage("O curso é inválido")
    ];
}

module.exports = generalValidator;