const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models/users");
const { tokenSing, refreshtokenSing, verifyrefreshToken, decodeSign } = require("../utils/handleJwt");

const signUpCtrl = async (req, res) => {
    const reqLimpia = matchedData(req);

    try {
        //? Verificamos que el usuario exista.
        const user =
            (await userModel.findOne({
                where: {
                    correo: reqLimpia.correo,
                },
            })) || null;

        if (user !== null) {
            return res.status(406).json({
                msg: "EMAIL_ALREADY_REGISTERED",
            });
        }

        //? Encriptacion de la contraseña traida del helper
        const contraseña = await encrypt(reqLimpia.contraseña);

        //? Convertimos el correo en minusculas
        const email = reqLimpia.correo;
        const correo = email.toLowerCase()

        //? La encriptacion es obligatoria, se esta se alamacena en Body
        const body = {
            ...reqLimpia,
            contraseña,
            correo
        };

        const dataUser = await userModel.create(body);

        //? Metodo para que NO aparezca dentro de la data la contraseña por temas de seguridad
        dataUser.set("contraseña", undefined, {
            strict: false,
        });

        //? Convinamos el token y el usuario
        const data = {
            user: dataUser,
        };

        //? definimos codigo de repuesta de creacion satisfactoria
        res.status(201).json({
            data,
        });
    } catch (e) {
        console.log(e);
        //? implementamos el manejador de errorres
        return res.status(404).json({
            msg: "ERROR_REGISTER_USER",
        });
    }
};

const signInCtrl = async (req, res) => {
    try {
        //? Limpiamos los datos aplicando machedData
        const reqLimpia = matchedData(req);

        //? trae el correo y lo usa como metodo de logeo.
        const user = await userModel.findOne({
            where: { correo: reqLimpia.correo },
        });

        //? Condición donde en caso de ser falso emplea el manejador de errores
        if (!user) {
            return res.status(404).json({
                msg: "USER_NOT_EXISTS",
            });
        }

        //? Extrae la contraseña en texto plano
        const hashPassword = user.get("contraseña");

        //? validación de la contraseña en texto plano con la que ya se encripto
        const check = await compare(reqLimpia.contraseña, hashPassword);

        if (!check) {
            return res.status(401).json({
                msg: "PASSWORD_INVALID",
            });
        }

        //? Metodo para que NO aparezca dentro de la data la contraseña por temas de seguridad
        user.set("contraseña", undefined, {
            strict: false,
        });

        //? Enviamos los datos para la creacion del token y lo concatenamos en el objeto con los datos del user
        const data = {
            token: await tokenSing(user),
            refreshtoken: await refreshtokenSing(user),
            user,
        };

        //?mostarmos la data como respuesta
        res.status(200).send({
            data,
        });
    } catch (e) {
        console.log(e);
        return res.status(404).json({
            msg: "ERROR_LOGIN_USER",
        });
    }
};

const getUsersCtrl = async (req, res) => {
    try {
        const users = await userModel.findAll();
        return res.send(users);
    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e);
        return res.status(400).json({
            msg: "ERROR_LIST_USERS",
        });
    }
};

const getUserCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        //? Verificamos que el usuario exista.
        const user = await userModel.findOne({
            where: {
                id: id,
            },
        });
        return res.status(200).send(user);
    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e);
        return res.status(400).json({
            msg: "ERROR_LIST_USER",
        });
    }
};

const refreshTokenCtrl = async (req, res) => {

    const refreshToken = req.headers.refresh;

    if (!refreshToken) {
        res.status(401).json({ msg: "Algo no va bien!", });
    }

    // verificamos la data del token
    const dataToken = await verifyrefreshToken(refreshToken);

    console.log(dataToken);

    // indicamos condicion en caso de que no exista
    if (!dataToken.id) {
        return res.json({
            msg: "ERROR_ID_TOKEN"
        });
    }

    const user = await userModel.findOne({ where: { id: dataToken.id } })

    const refreshtoken = await refreshtokenSing(user);
    const token = await tokenSing(user);

    //?mostarmos la data como respuesta
    res.status(200).send({
        refreshtoken,
        token
    });
};

const cambioEstadoUser = async (req, res) => {
    try {
        //? Filtramos el id y se alamacena en {id}.
        const id = req.params;

        //? Verificar existencia del usaurio. En caso de que el usuario no exista arroje un error  
        const user = await userModel.findOne({
            where: id,
        });

        //? Condición donde en caso de ser falso emplea el manejador de errores
        if (!user) {
            return res.status(404).json({
                msg: "USER_NOT_EXISTS",
            });
        }

        if (user.dataValues.estado === true) {
            userModel.update({ estado: false }, {
                where: id
            });
            res.status(200).json({ msg: "DESHABILIDATO" })
        } else if (user.dataValues.estado === false) {
            userModel.update({ estado: true }, {
                where: id
            });
            res.status(200).json({ msg: "HABILITADO" })
        } else {
            return res.status(404).json({
                msg: "ERROR_ESTADO",
            });
        }

    } catch (e) {
        console.log(e)
        //? implementamos el manejador de errorres
        return res.status(501).json({
            msg: "ERROR_DETALLE_ITEMS"
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        //? Establecemos constante donde almacenara el token del usuario  y la nueva contraseña
        const { newPassword } = req.body;
        const id = req.params;

        const user = await userModel.findOne({
            where: id,
        });

        //? Condición donde en caso de ser falso emplea el manejador de errores
        if (!user) {
            return res.status(404).json({
                msg: "USER_NOT_EXISTS",
            });
        }

        //? Encriptacion de la contraseña traida del helper
        const encryptPassword = await encrypt(newPassword);

        const data = await userModel.update({ contraseña: encryptPassword }, {
            where: id
        })

        if (data[0] === 1) {
            res.status(200).json({ msg: "OK" })
        } else {
            res.status(401).json({ msg: "ERROR_ID" })
        }

    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e)
        return res.status(409).json({
            msg: "ERROR_CAMBIO"
        });
    }
}

const cambioRol = async (req, res) => {
    try {
        //? Filtramos el id y se alamacena en {id}.
        const id = req.params;
        const { rol } = req.body;

        if (rol !== "SEGURIDAD" && "ADMINISTRADOR") {
            return res.status(404).json({
                msg: "ROL_INVALIDO",
            });
        }

        //? Verificar existencia del usaurio.
        //? En caso de que el usuario no exista arroje un error  
        const user = await userModel.findOne({
            where: id,
        });

        //? Condición donde en caso de ser falso emplea el manejador de errores
        if (!user) {
            return res.status(404).json({
                msg: "USER_NOT_EXISTS",
            });
        }

        //? actualizamos dato en la DB dependiendo el ID recibido y lo almacenamso en data
        const data = await userModel.update({ rol: rol }, {
            where: id
        });

        if (data[0] === 1) {
            res.status(200).json({ msg: "OK" })
        } else {
            console.log(data);
            res.status(401).json({ msg: "ERROR_ID" })
        }

    } catch (e) {
        console.log(e)
        //? implementamos el manejador de errorres
        return res.status(501).json({
            msg: "ERROR_DETALLE_ITEMS"
        });
    }
}

const eliminarUser = async (req, res) => {
    try {
        //? Filtramos el id de la req
        const id = req.params;
        
        //? eliminamos dato en la base de datos 
        const deleteUser = await userModel.destroy({where: id})

        //? Enviamos mensaje de confirmacion
        if (deleteUser === 1) {
            res.status(200).json({ msg: "OK" })
        } else {
            res.status(401).json({ msg: "ERROR_ID" })
        }
        
    } catch (e) {
        console.log(e)
        //? implementamos el manejador de errorres
        return res.status(500).json({
            msg: "ERROR_DELETE_ITEMS"
        });
    }
}

module.exports = {
    signUpCtrl,
    signInCtrl,
    getUsersCtrl,
    getUserCtrl,
    refreshTokenCtrl,
    cambioEstadoUser,
    resetPassword,
    cambioRol,
    eliminarUser
};
