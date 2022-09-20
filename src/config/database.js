const { Sequelize} = require('sequelize');
require("dotenv").config();

const host =process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const sequelize = new Sequelize(
    database,
    user,
    password,
    {
        host,
        dialect:"mysql"
    }
)

const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('+++ DB CONECTADA 😎 +++');
    } catch (error) {
        console.log('+++ ESA PORQUERIA DE DB NO CONECTA 😒 +++');
    }
}

module.exports = {
    dbConnectMySQL, 
    sequelize
};