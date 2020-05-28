const express = require("express");
const router = express.Router();
const Usuario = require("./modelo");
const { responder, crearToken } = require("../../utilidades/funciones");
const bcrypt = require('bcryptjs');

const multer = require('multer');
const subidaDeArchivos = multer({ dest: 'avatares/' });

/**
 * Consulta de todas las usuarios
 * GET /usuarios
 */
router.get("/", function (solicitud, respuesta) {
  Usuario.find({}, ['nombre', 'correoElectronico', 'avatar'], function (error, usuarios) {
    responder(error, respuesta, usuarios);
  });
});

/**
 * Consulta un usuario por su ID
 * GET /usuarios/:id
 */
router.get("/:id", function (solicitud, respuesta) {
  Usuario.findById(solicitud.params.id, function (error, usuario) {
    responder(error, respuesta, usuario);
  });
});

/**
 * Crea una nueva sesión
 * POST /usuarios/inicio_de_sesion
 */
router.post("/inicio_de_sesion", function (solicitud, respuesta) {
  console.log('body', solicitud.body)
  console.log(bcrypt.hashSync(solicitud.body.contrasena))
  Usuario.findOne({
    correoElectronico: solicitud.body.correoElectronico
  },
    function (error, usuario) {
      console.log('usuario ', usuario)

      bcrypt.compare(solicitud.body.contrasena, usuario.contrasenaEncriptada, function(err, res) {
        console.log('res ', res)
          if (res) {
            responder(error, respuesta, { token: crearToken(usuario) });
          } else {
            responder({ error: 'Usuario no encontrado' }, respuesta);
          }

          console.log('err', err)
        });
    }
  );
});

/**
 * Crea un nuevo usuario
 * POST /usuarios
 */
router.post("/", subidaDeArchivos.single('avatar'), async function (solicitud, respuesta) {
  console.log('solicitud.body ', solicitud.body);
  console.log('solicitud.avatar ', solicitud.avatar);
  console.log('solicitud.avatar ', solicitud.file.filename);
  const fullUrl = `${solicitud.protocol}://${solicitud.get('host')}/${solicitud.file.destination}${solicitud.file.filename}`
  console.log('fullUrl ', fullUrl);

  const usuario = {
    nombre: solicitud.body.nombre,
    correoElectronico: solicitud.body.correoElectronico,
    contrasenaEncriptada: bcrypt.hashSync(solicitud.body.contrasena),
    avatar: `${solicitud.protocol}://${solicitud.get('host')}/${solicitud.file.destination}${solicitud.file.filename}`
  }

  const nuevaUsuario = new Usuario(usuario);
  nuevaUsuario.save(function (error, usuarioCreado) {
    responder(error, respuesta, usuarioCreado);
  });
});

/**
 * Elimina un usuario por su ID
 * DELETE /usuarios/:id
 */
router.delete("/:id", function(solicitud, respuesta) {
  Usuario.findByIdAndDelete(solicitud.params.id, function(
      error,
      usuarioEliminado
  ) {
      responder(
          error,
          respuesta, { mensaje: "El usuario ha sido eliminado." },
          "El usuario NO ha podido ser eliminado."
      );
  });
});

module.exports = router;
