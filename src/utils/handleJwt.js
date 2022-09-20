//* Importamos jswebtoken
const jwt = require("jsonwebtoken");

//? Hacemos uso de la LlaveMaestar del .env
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH;

/**
 * Debes de pasar el objeto usuario
 * @param {*} user
 */
//? funcion para crear y firmar token
const tokenSing = async(user)=>{
    //? firmamos el token
    return jwt.sign(
        {
            //? PAYLOAD de mi token
            id: user.id,
            rol: user.rol,
            correo: user.correo
        },
        JWT_SECRET,
        {
             //? insertamos tiempo de expiracion para el token
        expiresIn: 600,
        }
    );
}

const refreshtokenSing = async(user)=>{
    //? firmamos el token
    return jwt.sign(
        {
            //? PAYLOAD de mi refreshtoken
            id: user.id,
        },
        JWT_REFRESH,
        {
            //? insertamos tiempo de expiracion para el token
            expiresIn: 600,
        }
    );
}

/**
 * Debes de pasar el objecto del usario
 * @param {*} tokenJwt
 */
//? Recibimos el token y Verificamos que el token haya sido firmado por nosotros
const verifyToken = async (tokenJwt) => {
    try{
        //? Veryficamos el token 
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    }catch(e){
        return null
    }
    
};

const verifyrefreshToken = async (tokenJwt) => {
    try{
        //? Veryficamos el token 
        return jwt.verify(tokenJwt, process.env.JWT_REFRESH)
    }catch(e){
        console.log(e);
        return null
    }
    
};

const decodeSign = (token) => {
    return jwt.decode(token);
};


//! exportacion 
module.exports = {
    tokenSing, 
    verifyToken,
    decodeSign,
    refreshtokenSing,
    verifyrefreshToken
}
