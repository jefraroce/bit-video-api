const nodemailer = require("nodemailer");

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
};

const enviarCorreo = function(nombreMensaje, correoMensaje, mensaje) {
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
          user: "bitmusica2@gmail.com",
          pass: "Bit-music@",
      },
  });

  const mailOptions = {
      from: '"BIT Video 👻" <info@bit-video.com>',
      to: correoMensaje,
      subject: nombreMensaje,
      text: mensaje,
      html: `<h1>¡¡¡Muchas gracias por tu Donación!!!</h1>
  <p>Cordialmente,<br/>BIT Video</p>`,
  };
console.log(mailOptions)

  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.error("Error enviando correo: ", error);
      } else {
          console.log("El correo ha sido enviado: ", info.response);
      }
  });
};

module.exports = { responder, enviarCorreo }
