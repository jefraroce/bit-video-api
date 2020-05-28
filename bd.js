const mongoose = require('mongoose')

const conectarBaseDeDatos = async function () {
  await mongoose.connect('mongodb+srv://prueba-bit:12345bit@bit-5lgzk.mongodb.net/bit_video', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  console.log('La conexión a la Base de Datos esta abierta.')
}

module.exports = { conectarBaseDeDatos }
