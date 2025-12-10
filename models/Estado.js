const Database = require("./Database");

const Estado = Database.sequelize.define('estado', {
    id: {
        type: Database.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    uf: {
        type: Database.Sequelize.STRING(10),
        allowNull: false
    }
},
{
    tableName: 'estado',
    timestamps: false
});

module.exports = Estado;