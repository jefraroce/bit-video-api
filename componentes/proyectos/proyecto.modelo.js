const mongoose = require('mongoose')

const proyectoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  nombreProyecto:{ type: String, required: true },
  descripcionProyecto: { type: String, required: true },
  portada: { type: String, required: true },
  enlace: { type: String, required: true },
})

const Proyecto = mongoose.model('proyectos', proyectoSchema)

module.exports = Proyecto 
