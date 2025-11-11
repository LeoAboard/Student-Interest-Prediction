import { DataTypes } from "sequelize";
import sequelize from "../Database.js";

const Adm = sequelize.define("admin", {
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },

    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
},
{
    tableName: 'admin',
    timestamps: false
});

export default Adm;