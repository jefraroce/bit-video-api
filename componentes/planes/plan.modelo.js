const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  proyectoId: { type: String, required: true },
  descripcionPlan: { type: String, required: true },
  nombrePlan:{ type: String, required: true },
  valor: { type: String, required: true },
})

const Plan = mongoose.model('planes', planSchema)

module.exports = Plan 
