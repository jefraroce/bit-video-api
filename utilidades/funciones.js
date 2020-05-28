const responder = function(
  error,
  respuesta,
  valorAEnviarEnExito,
  mensajeDeError,
  codigoDeEstado
) {
  if (error) {
      respuesta
          .status(codigoDeEstado || 500)
          .json({ mensaje: mensajeDeError || error });
      console.error("[Error en Base De Datos] : ", error);
  } else {
      respuesta.status(codigoDeEstado || 200).json(valorAEnviarEnExito);
  }
}

module.exports = { responder }
