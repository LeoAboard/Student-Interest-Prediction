const Database = require("./Database");

const Adm = Database.sequelize.define("admin", {
    email: { 
        type: Database.Sequelize.STRING, 
        allowNull: false, 
        unique: true 
    },

    password: { 
        type: Database.Sequelize.STRING, 
        allowNull: false
    }
},
{
    tableName: 'admin',
    timestamps: false
});

module.exports = Adm;