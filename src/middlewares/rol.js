const checkRol = (roles) => (req, res, next) => {
    try{
        //? Estraemos los datos de la req
        const {user} = req;
        
        //? Estraemos el rol de los datos del User que por predeterminado es "Invitado"
        const rolesByUser = user.rol; //TODO ["invitado"]
        
        //? hace la comparación del rol que tiene el usuario con el que se define en la ruta.
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) // Devuelve un boolean

        //? Condición en caso de error mostrara 403
        if(!checkValueRol){
            return res.status(500).json({
                msg: 'NO_TIENE_PERMISOS'
            });
        }
        next()

    }catch(e){
        console.log(e);
        return res.status(404).json({
            msg: 'NO_INICIO_SESION'
        });
    }
};

module.exports = {checkRol}