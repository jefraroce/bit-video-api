const express = require('express')
const { conectarBaseDeDatos } = require('./bd')
const cors = require('cors')
const bodyParser = require('body-parser')

// Inicializamos express
const app = express()
const PUERTO = process.env.PORT || 3000

conectarBaseDeDatos()

app.use(cors())
app.use(bodyParser.json())

// Agregamos nuestras rutas
app.get('/', function(solicitud, respuesta) {
  respuesta.send('<h1>¡Bienvenidos!</h1> <h3>Menú</h3><ul><li><a href="/usuario">Ver Usuarios</a></li><li><a href="/proyecto">Ver Proyecto</a></li><li><a href="/mensaje">Ver Mensaje</a></li><li><a href="/donacion">Ver Donacion</a></li><li><a href="/plan">Ver Plan</a></li></ul>')
})

require('./componentes/usuarios/usuario.rutas')(app);
require('./componentes/proyectos/proyecto.rutas')(app);
require('./componentes/mensajes/mensaje.rutas')(app);
require('./componentes/donaciones/donacion.rutas')(app);
require('./componentes/planes/plan.rutas')(app);


app.use('/avatares', express.static('avatares'))

// Encendemos el servidor de express
app.listen(PUERTO, function() {
  console.log(`Escuchando en http://localhost:${PUERTO}`)
})
