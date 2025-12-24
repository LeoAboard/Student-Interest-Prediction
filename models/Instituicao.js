const Database = require("./Database");

const Instituicao = Database.sequelize.define("instituicao", {
    id: { 
        type: Database.Sequelize.INTEGER, 
        allowNull: false, 
        unique: true,
        primaryKey: true,
        autoIncrement: true 
    },

    nome: { 
        type: Database.Sequelize.STRING, 
        allowNull: false
    }
},
{
    tableName: 'instituicao',
    timestamps: false
});

module.exports = Instituicao;