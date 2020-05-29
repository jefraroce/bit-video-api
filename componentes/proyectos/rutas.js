const express = require('express')
const router = express.Router()
const Proyecto = require('./modelo')
const { responder } = require('../../utilidades/funciones')


router.get('/', function(solicitud, respuesta) {
  Proyecto.find(solicitud.query, ['proyectoId', 'planId', 'descripcionProyecto', 'portada'], function(error, proyectos) {
    responder(error, respuesta, proyectos)
  })
})

router.post('/', function (solicitud, respuesta) {
  const datosProyectos = {
    proyectoId: solicitud.body.proyectoId,
    nombreProyecto: solicitud.body.nombreProyecto,
    descripcionProyecto: solicitud.body.descripcionProyecto,
    portada: solicitud.body.portada,
    enlace: solicitud.body.enlace   
  }

  const datosProyectos = new Usuario(datosProyectos)
  nuevoProyecto.save(function(error, proyectoCreado) {
    responder(error, respuesta, proyectoCreado)
  })
})

module.exports = router