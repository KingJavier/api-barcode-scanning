const express = require('express');
const { 
    signUpCtrl, 
    signInCtrl, 
    getUsersCtrl, 
    getUserCtrl,
    refreshTokenCtrl,
    cambioEstadoUser,
    resetPassword,
    cambioRol,
    eliminarUser,
  } = require('../controllers/auth');
const { verifyEstado } = require('../middlewares/estado_user');
const { checkRol } = require('../middlewares/rol');
const { authMiddleware } = require('../middlewares/session');
const { validatorLogueo, validatorRegister } = require ('../validators/auth');
const router = express.Router();

router.post('/signup', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), validatorRegister, signUpCtrl);

router.post('/signIn', validatorLogueo, signInCtrl);

router.get('/users', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), getUsersCtrl);

router.get('/users/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), getUserCtrl);

router.post('/refresh-token', refreshTokenCtrl);

//? ruta para inhabilitar usuarios
router.put('/estado/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), cambioEstadoUser);

//? ruta para cambiar el password
router.put('/reset-password/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), resetPassword);

//? ruta para actulizar el rol.
router.put('/cambio-rol/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), cambioRol);

//? ruta para actulizar el rol.
router.delete('/:id', verifyEstado, authMiddleware, checkRol(['ADMINISTRADOR']), eliminarUser);

module.exports = router;
