const Database = require("./Database");

const Aluno = Database.sequelize.define('aluno', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    data_cadastro: {
        type: Database.Sequelize.DATE,
        allowNull: false,
        defaultValue: Database.Sequelize.NOW
    },

    nome: {
        type: Database.Sequelize.STRING(100),
        allowNull: true
    },

    data_nasc: {
        type: Database.Sequelize.DATE,
        allowNull: false
    },

    genero: {
        type: Database.Sequelize.STRING(25),
        allowNull: true
    },

    instituicao: {
        type: Database.Sequelize.STRING(100),
        allowNull: false
    },

    escolaridade_id: {
        type: Database.Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },

    cidade_id: {
        type: Database.Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },

    consentimento: {
        type: Database.Sequelize.BOOLEAN,
        allowNull: false
    },
}, 
{
    tableName: 'aluno',
    timestamps: false
});

module.exports = Aluno;