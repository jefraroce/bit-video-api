const express = require('express')
const router = express.Router()
const Usuario = require('./modelo')
const { responder } = require('../../utilidades/funciones')
const bcrypt = require('bcryptjs')

const multer = require('multer')
const subidaDeArchivos = multer({ dest: 'avatares/' })

router.get('/', function(solicitud, respuesta) {
  // El segundo parametro solo es necesario cuando yo necesito traer unos campos especificos, es decir, no todos
  // Para traer Todos los campos Usuario.find(solicitud.query, function(error, usuarios) {
  // Para traer solo el campo "nombre" Usuario.find(solicitud.query, ['nombre'], function(error, usuarios) {
  Usuario.find(solicitud.query, ['nombre', 'correoElectronico', 'avatar'], function(error, usuarios) {
    responder(error, respuesta, usuarios)
  })
})

router.post('/', subidaDeArchivos.single('avatar'), function (solicitud, respuesta) {
  console.log('solicitud.body ', solicitud.body)

  const datosUsuario = {
    avatar: `${solicitud.protocol}://${solicitud.get('host')}/${solicitud.file.destination}${solicitud.file.filename}`,
    nombre: solicitud.body.nombre,
    correoElectronico: solicitud.body.correoElectronico,
    contrasenaEncriptada: solicitud.body.contrasena === undefined ? null : bcrypt.hashSync(solicitud.body.contrasena)
  }

  const nuevoUsuario = new Usuario(datosUsuario)
  nuevoUsuario.save(function(error, usuarioCreado) {
    responder(error, respuesta, usuarioCreado)
  })
})

module.exports = router
