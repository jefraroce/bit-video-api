const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  contrasenaEncriptada: { type: String, required: true },
  avatar: { type: String, required: true }
})

// Apply the uniqueValidator plugin to userSchema.
usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model('usuarios', usuarioSchema)

module.exports = Usuario
