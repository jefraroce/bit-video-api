const mongoose = require('mongoose')

const mensajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoMensaje: { type: String, required: true },
  mensaje: { type: String, required: true }
})

const Mensaje = mongoose.model('mensajes', mensajeSchema)

module.exports = Mensaje
