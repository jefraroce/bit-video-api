const mongoose = require('mongoose')

const conectarBaseDeDatos = async function () {
  await mongoose.connect('mongodb+srv://JOSE8327:JOSE8327@cluster0-o0lnc.mongodb.net/bit-video', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  console.log('La conexión a la Base de Datos esta abierta.')
}

module.exports = { conectarBaseDeDatos }

