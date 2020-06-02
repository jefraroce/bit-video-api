module.exports = (app) => {
  const mensaje = require('./mensaje.controlador');
 
  // Crear un nuevo mensaje
  app.post('/mensaje', mensaje.create);

  // Obtener todos los mensajes
  app.get('/mensaje', mensaje.findAll);

  // Obtener un solo mensaje con el mensajeId
  app.get('/mensaje/:mensajeId', mensaje.findOne);

  // Actualizar un mensaje con el mensajeId
  app.put('/mensaje/:mensajeId', mensaje.update);

  // Eliminar un mensaje con el mensajeId
  app.delete('/mensaje/:mensajeId', mensaje.delete);
}