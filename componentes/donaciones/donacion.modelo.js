const mongoose = require('mongoose')

const donacionSchema = new mongoose.Schema({
  proyectoId:{ type: String, required: true },
  planId: { type: String, required: false },
  nombreDonante: { type: String, required: true },
  correoDonante: { type: String, required: true },
  telefonoDonante: { type: String, required: true },
  valor: { type: Number, required: true }
})

const Donacion = mongoose.model('donaciones', donacionSchema)

module.exports = Donacion 
