const jwt = require('jwt-simple')
const moment = require('moment')
const { responder } = require('./funciones')
const SECRET = 'misecreto'

const crearToken = function (usuario) {
  const payload = {
    id: usuario._id,
    nombre: usuario.nombre,
    fechaDeExpiracion: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, SECRET)
}

const validarToken = function (token) {
  try {
    const payload = jwt.decode(token, SECRET)

    if (payload.fechaDeExpiracion < moment().unix()) {
      console.error('Este token ya ha expirado')
      return false
    }
  } catch(error) {
    console.error('Error decodificando token: ', error)
    return false
  }

  return true
}

const middlewareDeAutorizacion = function (solicitud, respuesta, next) {
  authorization = solicitud.headers.authorization

  if (authorization && validarToken(authorization.split(' ')[1])) {
    next()
  } else {
    responder({}, respuesta, null, 'Usted NO está autorizado para realizar esta acción.', 401)
  }
}

module.exports = { crearToken, middlewareDeAutorizacion, validarToken }
