//* Importaciones 
const express = require('express')
const cors = require('cors');
const { dbConnectMySQL} = require('./src/config/database') 
require("dotenv").config();

const app = express()

//* Configuraciones
app.use(cors())
app.set('port', process.env.PORT || 3001)

//* Middlewares
app.use(express.json())

//* Rutas
//? utilizamos puerto establecido en .env o el puerto 3000
const port = process.env.PORT || 3000 || 3100

//? Definimos el puerto por el que sera escucha la api
app.listen(port,() => {
    console.log(`Server en el puerto http://localhost:${port}`);
});

app.use((req, res, next) => {
    //? Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// TODO http://localhost/api/ ____
app.use("/api",require('./src/routes'));


dbConnectMySQL();




