const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/database")

const userModel = sequelize.define(
    'tbl_usuarios',
    {
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
        },
        rol: {
            type: DataTypes.ENUM(["ADMINISTRADOR","SEGURIDAD"])
        },
        estado: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        timestamps: true,
    }
);

module.exports = {
    userModel
}