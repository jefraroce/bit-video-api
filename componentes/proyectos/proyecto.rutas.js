module.exports = (app) => {
  const proyecto = require('./proyecto.controlador');
 
  // Crear un nuevo proyecto
  app.post('/proyecto', proyecto.create);

  // Obtener todos los proyectos
  app.get('/proyecto', proyecto.findAll);

  // Obtener un solo proyecto con el proyectoId
  app.get('/proyecto/:proyectoId', proyecto.findOne);

  // Actualizar un proyecto con el proyectoId
  app.put('/proyecto/:proyectoId', proyecto.update);

  // Eliminar un proyecto con el proyectoId
  app.delete('/proyecto/:proyectoId', proyecto.delete);
}
