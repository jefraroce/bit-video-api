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