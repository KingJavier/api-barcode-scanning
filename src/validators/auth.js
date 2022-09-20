//* importamos check
const {check} = require ("express-validator");
const  validateResult = require('../utils/handleValidators');

//? creamos validación para la funcion register
const validatorRegister =[
    //? otorgamos validaciones para cada uno de nuestros atributos
    check("correo")
    .exists()
    .isEmail()
    .notEmpty(),
    check("contraseña")
    .exists()
    .isLength({min:7, max:20})
    .notEmpty(),
    check("rol")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
];

//? Creamos validacion para logueo de usuario
const validatorLogueo =[
    //? otorgamos validaciones para cada uno de nuestros atributos
    check("correo")
    .exists()
    .isEmail()
    .notEmpty(),
    check("contraseña")
    .exists()
    .isLength({min:7, max:20})
    .notEmpty(),
    (req, res, next) => {
        return validateResult(req, res, next)
    }
];

//! exportamos validator
module.exports = { validatorRegister, validatorLogueo};