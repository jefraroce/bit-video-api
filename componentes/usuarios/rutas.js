const express = require('express')
const router = express.Router()
const Usuario = require('./modelo')
const { responder } = require('../../utilidades/funciones')
const bcrypt = require('bcryptjs')

router.get('/', function(solicitud, respuesta) {
  Usuario.find(solicitud.query, ['nombre', 'correoElectronico', 'avatar'], function(error, usuarios) {
    responder(error, respuesta, usuarios)
  })
})

router.post('/', function (solicitud, respuesta) {
  const datosUsuario = {
    // avatar: solicitud.body.avatar,
    nombre: solicitud.body.nombre,
    correoElectronico: solicitud.body.correoElectronico,
    contrasenaEncriptada: bcrypt.hashSync(solicitud.body.contrasena)
  }

  const nuevoUsuario = new Usuario(datosUsuario)
  nuevoUsuario.save(function(error, usuarioCreado) {
    responder(error, respuesta, usuarioCreado)
  })
})

module.exports = router
