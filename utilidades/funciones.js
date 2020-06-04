const nodemailer = require("nodemailer")

const responder = function (
  error,
  respuesta,
  valorAEnviarEnExito,
  mensajeDeError,
  codigoDeEstado
) {
  if (error) {
    respuesta
      .status(codigoDeEstado || 500)
      .json({ mensaje: mensajeDeError || error })
    console.error("[Error en Base De Datos] : ", error)
  } else {
    respuesta.status(codigoDeEstado || 200).json(valorAEnviarEnExito)
  }
}

const enviarCorreo = function (correoDeDestino, asunto, contenidoHTML, contenidoTexto = '') {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bitmusica2@gmail.com",
      pass: "Bit-music@",
    },
  })

  const elCorreoEntero = {
    from: '"BIT Video 👻" <info@bit-video.com>',
    to: correoDeDestino,
    subject: asunto,
    text: contenidoTexto,
    html: contenidoHTML
  }

  transporter.sendMail(elCorreoEntero, function (error, info) {
    if (error) {
      console.error("Error enviando correo: ", error)
    } else {
      console.log("El correo ha sido enviado: ", info.response)
    }
  })
}

module.exports = { responder, enviarCorreo }
