const Sequelize = require('sequelize');
require('dotenv').config();
const BD_NAME = process.env.BD_NAME;
const BD_USER = process.env.BD_USER;
const BD_PASS = process.env.BD_PASS;
const HOST = process.env.HOST;

const sequelize = new Sequelize(BD_NAME, BD_USER, BD_PASS, {
    host: HOST,
    dialect: "postgresql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
