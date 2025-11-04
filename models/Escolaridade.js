const Database = require("./Database");

const Escolaridade = Database.sequelize.define('escolaridade', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nivel: {
        type: Database.Sequelize.STRING(100),
        allowNull: false
    },
});

module.exports = Escolaridade;