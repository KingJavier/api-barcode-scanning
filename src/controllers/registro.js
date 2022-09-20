const { matchedData } = require("express-validator");
const { registroModel } = require("../models/registro");

const crearRegistro = async (req, res) => {
    try {
        //? optenemos el cuerpo de la req 
        const reqLimpia = matchedData(req);
        //? Se sube a la base de datos segun el modelo
        const data = await registroModel.create(reqLimpia);
        //? codigo de satisafaccion al enviar un archivo
        res.status(201);
        //? mostramos los datos que se quieren subir 
        res.send({ data });
    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e);
        return res.status(500).json({
            msg: "ERROR_CREATE_REGISTRO"
        });
    }
};

const FechaRegistro = async (req, res) => {
    try {
        //? Filtramos el id de la req
        const body = req.body;
        const id = req.params;

        //? actualizamos dato en la DB dependiendo el ID recibido y lo almacenamso en data
        const data = await registroModel.update(body, {
            where: id
        });

        if (data[0] === 1) {
            res.status(200).json({ msg: "OK" })
        } else {
            res.status(401).json({ msg: "ERROR_ID" })
        }

    } catch (e) {
        //? implementamos el manejador de errorres
        return res.status(500).json({
            msg: "ERROR_FECHA"
        });
    }
};

const UpdateRegistro = async (req, res) => {
    try {
        //? Filtramos el id de la req
        const body = matchedData(req);
        const id = req.params;

        //? actualizamos dato en la DB dependiendo el ID recibido y lo almacenamso en data
        const data = await registroModel.update(body, {
            where: id
        });
        console.log(data);

        if (data[0] === 1) {
            const registro = await registroModel.findOne({
                where: id
            });
            res.status(200).json({ registro })
        } else {
            res.status(401).json({ msg: "ERROR_ID" })
        }

    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e);
        return res.status(500).json({
            msg: "ERROR_UPDATE_ITEMS"
        });
    }
};

const getRegistrosCtrl = async (req, res) => {
    try {
        const users = await registroModel.findAll();
        return res.send(users);
    } catch (e) {
        //? implementamos el manejador de errorres
        console.log(e);
        return res.status(400).json({
            msg: "ERROR_LIST_USERS",
        });
    }
};

const getRegistroCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        //? Verificamos que el usuario exista.
        const user = await registroModel.findOne({
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

const eliminarRegistro = async (req, res) => {
    try {
        //? Filtramos el id de la req
        const id = req.params;
        
        //? eliminamos dato en la base de datos 
        const deleteRegistro = await registroModel.destroy({where: id})

        //? Enviamos mensaje de confirmacion
        if (deleteRegistro === 1) {
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
    crearRegistro,
    FechaRegistro,
    UpdateRegistro,
    getRegistroCtrl,
    getRegistrosCtrl,
    eliminarRegistro
};
