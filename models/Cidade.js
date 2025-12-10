const Database = require("./Database");

const Cidade = Database.sequelize.define('cidade', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: Database.Sequelize.STRING(50),
        allowNull: false
    },

    estado_id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
},
{
    tableName: 'cidade',
    timestamps: false
});

module.exports = Cidade;