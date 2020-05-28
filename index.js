const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const conectarBaseDeDatos = require('./bd')
const rutasDeUsuarios = require('./componentes/usuarios/rutas')

conectarBaseDeDatos()

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

// Agregamos middlewares
app.use(cors()) // Necesario para permitir requests desde cualquier dominio
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
