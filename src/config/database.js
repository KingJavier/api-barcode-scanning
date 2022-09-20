const { Sequelize} = require('sequelize');
require("dotenv").config();

const URI = process.env.URI;

const sequelize = new Sequelize(URI)

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