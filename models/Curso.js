const Database = require("./Database");

const Curso = Database.sequelize.define('curso', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: Database.Sequelize.STRING(50),
        allowNull: false
    }
},
{
    tableName: 'curso',
    timestamps: false
});

module.exports = Curso;