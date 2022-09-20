//* importamos check
const {check} = require ("express-validator");
const  validateResult = require('../utils/handleValidators');

//? creamos validación para la funcion register
const validatorCrearRegistro =[
    //? otorgamos validaciones para cada uno de nuestros atributos
    check("numero_documento")
    .exists()
    .notEmpty(),
    check("primer_nombre")
    .exists()
    .notEmpty(),
    check("segundo_nombre")
    .exists()
    .notEmpty(),
    check("primer_apellido")
    .exists()
    .notEmpty(),
    check("segundo_apellido")
    .exists()
    .notEmpty(),
    check("sexo")
    .exists()
    .notEmpty(),
    check("edad")
    .exists()
    .isNumeric()
    .notEmpty(),
    check("grupo_sanguineo")
    .exists()
    .notEmpty(),
    check("motivo")
    .exists()
    .notEmpty(),
    check("hora_entrada")
    .exists()
    .notEmpty(),
    check("hora_salida")
    .exists(),
    check("id_usuario")
    .exists()
    .notEmpty(),

    (req, res, next) => {
        return validateResult(req, res, next)
    }
];

//! exportamos validator
module.exports = { validatorCrearRegistro };