const express = require('express');
const { crearRegistro, FechaRegistro, UpdateRegistro, getRegistrosCtrl, getRegistroCtrl, eliminarRegistro } = require('../controllers/registro');
const { verifyEstado } = require('../middlewares/estado_user');
const { checkRol } = require('../middlewares/rol');
const { authMiddleware } = require('../middlewares/session');
const { validatorCrearRegistro } = require ('../validators/registro');

const router = express.Router();

router.post('/', verifyEstado, authMiddleware, validatorCrearRegistro, checkRol(['ADMINISTRADOR', 'SEGURIDAD']), crearRegistro);

router.post('/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR', 'SEGURIDAD']), FechaRegistro);

router.put('/:id', verifyEstado, authMiddleware, validatorCrearRegistro, checkRol(['ADMINISTRADOR', 'SEGURIDAD']), UpdateRegistro);

router.get('/', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), getRegistrosCtrl);

router.get('/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), getRegistroCtrl);

//? ruta para actulizar el rol.
router.delete('/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), eliminarRegistro);

module.exports = router;
