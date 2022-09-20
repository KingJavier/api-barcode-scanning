const { DataTypes } = require('sequelize');
const { sequelize } = require("../config/database")

const registroModel = sequelize.define(
    'tbl_registros',
    {
        numero_documento: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        primer_nombre: {
            type: DataTypes.STRING,
        },
        segundo_nombre: {
            type: DataTypes.STRING,
        },
        primer_apellido: {
            type: DataTypes.STRING,
        },
        segundo_apellido: {
            type: DataTypes.STRING,
        },
        sexo: {
            type: DataTypes.ENUM(["M","F"])
        },
        edad:{
            type: DataTypes.NUMBER
        },
        grupo_sanguineo: {
            type: DataTypes.STRING
        },
        motivo: {
            type: DataTypes.STRING
        },
        hora_entrada: {
            type: DataTypes.DATE
        },
        hora_salida: {
            type: DataTypes.DATE
        },
        id_usuario:{
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps: true,
    }
);

module.exports = {
    registroModel
}