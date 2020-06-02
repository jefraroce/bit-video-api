module.exports = (app) => {
  const plan = require('./plan.controlador');
 
  // Crear un nuevo plan
  app.post('/plan', plan.create);

  // Obtener todos los plans
  app.get('/plan', plan.findAll);

  // Obtener un solo plan con el planId
  app.get('/plan/:planId', plan.findOne);

  // Actualizar un plan con el planId
  app.put('/plan/:planId', plan.update);

  // Eliminar un plan con el planId
  app.delete('/plan/:planId', plan.delete);
}