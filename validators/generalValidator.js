const { body } = require('express-validator');

function generalValidator() {
    //nome
    return [
        body('nome').isLength({ min: 2, max: 100 }).withMessage("O tamanho do nome é inválido"),

        //tipo do contato
        body('tipo').isIn(['email', 'telefone']).withMessage("O tipo é inválido"),

        body('contato')
            .optional({ checkFalsy: true })
            .custom((value, { req }) => {
                const tipo = req.body.tipo;

                if (tipo === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                    if (!emailRegex.test(value)) {
                        throw new Error("O e-mail informado é inválido");
                    }
                }

                if (tipo === 'telefone') {
                    const telRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
                    if (!telRegex.test(value)) {
                        throw new Error("O telefone informado é inválido");
                    }
                }

                return true;
            }),

        //genero
        body('genero').isIn(['masculino', 'feminino', 'outro']).withMessage("O gênero é inválido"),

        //rede_social
        body('rede_social').isIn(['Instagram', 'Facebook', 'TikTok', 'Twitter', 'Whatsapp', 'Telegram']).withMessage("A rede social é inválida"),

        //curso
        body('curso_id').isIn([1, 2, 3, 4]).withMessage("O curso é inválido"),

        body('interesse').isLength({ max: 100 }).withMessage("O interesse é inválido"),

        body('observacao').isLength({ max: 300 }).withMessage("A observação é inválida"),

        body('evento').isLength({ max: 50 }).withMessage("O evento é inválido")
    ];
}

module.exports = generalValidator;