const Database = require("./Database");

const Preferencia = Database.sequelize.define('preferencia', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    aluno_id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },

    area_atuacao: {
        type: Database.Sequelize.STRING(100),
        allowNull: false
    },

    turno: {
        type: Database.Sequelize.STRING(25),
        allowNull: false
    },

    rede_social: {
        type: Database.Sequelize.STRING(25),
        allowNull: false
    },

    interesse: {
        type: Database.Sequelize.STRING(100),
        allowNull: false
    },

    faz_enem: {
        type: Database.Sequelize.BOOLEAN,
        allowNull: false
    },

    curso_id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },

    observacao: {
        type: Database.Sequelize.TEXT,
        allowNull: true
    },

    evento: {
        type: Database.Sequelize.TEXT,
        allowNull: true
    },
},
{
    tableName: 'preferencia',
    timestamps: false
});

module.exports = Preferencia;