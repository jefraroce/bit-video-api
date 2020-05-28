const mongoose = require('mongoose')

// mongodb+srv://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME
const conectarBaseDeDatos = async function () {
  await mongoose.connect('mongodb://127.0.0.1:27017/bit_video', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('La conexión a la DB fue exitosa!')
}

module.exports = conectarBaseDeDatos
