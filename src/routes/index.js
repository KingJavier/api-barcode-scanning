//* Importamos y guardamos express, router en una variable
const express = require('express');
const router = express.Router();

//* Importamos fs (biene pre instalado
const fs = require ('fs')

//? constante que nos dara la ruta actual en la que estamos
const PATH_ROUTES = __dirname;

//? funcion para remover el indicador de tipo de archivo
const removeExtension = (fileName) =>{
    //? con split hacemos que apartir del "." y son shift tomamos la parte inicial 
    return fileName.split('.').shift() //TODO auth
}

//? leemos el direcctorio de manera asincroma
fs.readdirSync(PATH_ROUTES).filter((file)=>{ 
    
   //? concatenamos la ruta 
    const name = removeExtension(file)
    //? Condicion para que descarte el archivo index como una ruta
    if (name !=='index'){
        //? pedimos que utilice / al inicion. pedimos nombre del archivo 
        router.use(`/${name}`,require(`./${file}`))
    }
})

//! exportamos rutas
module.exports = router