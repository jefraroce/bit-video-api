const config = require('../configuracion');
const moment = require('moment');
const jwt = require('jwt-simple');

const responder = function(
    error,
    respuesta,
    valorAEnviarEnExito,
    mensajeDeError,
    codigoDeEstado
) {
    if (error) {
        respuesta
            .status(codigoDeEstado || 500)
            .json({ mensaje: mensajeDeError || error });
        console.error("[Error en Base De Datos] : ", error);
    } else {
        respuesta.status(codigoDeEstado || 200).json(valorAEnviarEnExito);
    }
}

const crearToken = function (usuario) {
    const payload = {
        sub: usuario._id,
        iat: moment().unix(),
        exp: moment().add(5, 'days')
    }

    return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = { responder, crearToken };
