const express = require('express')

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

// Agregamos nuestras rutas
app.get('/', function(solicitud, respuesta) {
  respuesta.send('Hola')
})

// Encendemos el servidor de express
app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
