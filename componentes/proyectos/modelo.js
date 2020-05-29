const mongoose = require('mongoose')

const proyectoSchema = new mongoose.Schema({
  proyectoId: { type: String, required: true, unique: true },
  nombreProyecto:{ type: String, required: true },
  // planId:{ type: String, required: true, unique: true }, 
  descripcionProyecto: { type: String, required: true },
  portada: { type: String, required: true },
  enlace: { type: String, required: true },
})

const Proyecto = mongoose.model('proyectos', proyectoSchema)

module.exports = Proyecto 
