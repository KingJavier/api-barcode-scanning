//* importaciones
const {validationResult} = require('express-validator');

//? Creamos helper de validacion para manejar la validacion.
const validateResult = (req,res,next)=>{
    //? creamos try para validar los datos
    try {
        //? crashea la ejecucion y lo manda al catch
        validationResult(req).throw();
        //? Continua hacia el controlador
        return next();
    }
    // exection
    catch (err){
        res.status(403);
        res.send({errors:err.array()});
    }
};

//! Exportacion 
module.exports = validateResult

