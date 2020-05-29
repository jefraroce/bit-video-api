const mongoose = require('mongoose')

const donacionSchema = new mongoose.Schema({
  proyectoId:{ type: String, required: true, unique: true },
  planId: { type: String, required: true, unique: true },
  nombreDonante: { type: String, required: true },
  correoDonante: { type: String, required: true },
  telefonoDonante: { type: String, required: true, unique: true }
})

const Donacion = mongoose.model('donaciones', donacionSchema)

module.exports = Donacion 
