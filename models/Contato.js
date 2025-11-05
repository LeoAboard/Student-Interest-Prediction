const Database = require("./Database");

const Contato = Database.sequelize.define('contato', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    tipo: {
        type: Database.Sequelize.STRING(25),
        allowNull: false
    },

    contato: {
        type: Database.Sequelize.STRING(100),
        allowNull: false
    },
},
{
    tableName: 'contato',
    timestamps: false
});

module.exports = Contato;