const express = require('express')
const { conectarBaseDeDatos } = require('./bd')
const rutasDeUsuarios = require('./componentes/usuarios/rutas')
const bodyParser = require('body-parser')

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

conectarBaseDeDatos()

app.use(bodyParser.json())

// Agregamos nuestras rutas
app.get('/', function(solicitud, respuesta) {
  respuesta.send('Hola')
})

app.use('/usuarios', rutasDeUsuarios)

// Encendemos el servidor de express
app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
