const express = require('express')
const { conectarBaseDeDatos } = require('./bd')
const rutasDeUsuarios = require('./componentes/usuarios/rutas')
const rutasDeProyectos = require('./componentes/proyectos/rutas')
const bodyParser = require('body-parser')

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

conectarBaseDeDatos()

app.use(bodyParser.json())

// Agregamos nuestras rutas
app.get('/', function(solicitud, respuesta) {
  respuesta.send('Hola Bit')
})

app.use('/usuarios', rutasDeUsuarios)
app.use('/proyectos', rutasDeProyectos)

app.use('/avatares', express.static('avatares'))

// Encendemos el servidor de express
app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
