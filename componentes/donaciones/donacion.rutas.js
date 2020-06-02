// const express = require('express')
// const router = express.Router()
// const Donacion = require('./modelo')
// const { responder } = require('../../utilidades/funciones')


// router.get('/', function(solicitud, respuesta) {
//   Donacion.find(solicitud.query, function(error, donaciones) {
//     responder(error, respuesta, donaciones)
//   })
// })

// router.post('/', function (solicitud, respuesta) {
//   const datosDonaciones = {
//     proyectoId: solicitud.body.proyectoId,
//     planId: solicitud.body.planId,
//     nombreDonante: solicitud.body.nombreDonante,
//     correoDonante: solicitud.body.correoDonante,
//     telefonoDonante: solicitud.body.telefonoDonante
//   }

//   const nuevaDonacion = new Donacion(datosDonaciones)
//   nuevaDonacion.save(function(error, donacionCreada) {
//     responder(error, respuesta, donacionCreada)
//   })
// })

// module.exports = router

module.exports = (app) => {
  const donacion = require('./donacion.controlador');
 
  // Crear un nuevo donacion
  app.post('/donacion', donacion.create);

  // Obtener todos los donacions
  app.get('/donacion', donacion.findAll);

  // Obtener un solo donacion con el donacionId
  app.get('/donacion/:donacionId', donacion.findOne);

  // Actualizar un donacion con el donacionId
  app.put('/donacion/:donacionId', donacion.update);

  // Eliminar un donacion con el donacionId
  app.delete('/donacion/:donacionId', donacion.delete);
}