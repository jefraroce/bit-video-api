const Mensaje = require('./mensaje.modelo');
const { enviarCorreo } = require('../../utilidades/funciones')

// Create and Save a new Mensaje
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido del Mensaje no puede estar vacio"
        });
    }

    // Create a Mensaje
    const mensaje = new Mensaje({
        nombre: req.body.nombre,
        correoMensaje: req.body.correoMensaje,
        mensaje: req.body.mensaje
    });
    // Save Mensaje in the database
    mensaje.save()
        .then(data => {
            res.status(201).send(data);

            const contenidoCorreo = `<h1>Muchas gracias por tu mensaje, pronto nuestro equipo se comunicara contigo</h1>
               <table>
                   <thead>
                       <tr>
                          <td>${data.nombreMensaje}</td>
                       </tr>
                   </thead>
               </table>`;

            enviarCorreo(req.body.correoMensaje, 'Equipo BIT-Video', contenidoCorreo)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error creando el Mensaje."
            });
        });
};

// Retrieve and return all mensajes from the database.
exports.findAll = (req, res) => {
    Mensaje.find()
        .then(mensajes => {
            res.send(mensajes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error obteniendo los mensajes."
            });
        });
};

// Encontrar un mensaje con el mensajeId
exports.findOne = (req, res) => {
    Mensaje.findById(req.params.mensajeId)
        .then(mensaje => {
            if (!mensaje) {
                return res.status(404).send({
                    message: "Mensaje no encontrado con id " + req.params.mensajeId
                });
            }
            res.send(mensaje);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Mensaje no encontrado con id " + req.params.mensajeId
                });
            }
            return res.status(500).send({
                message: "Error obteniendo el mensaje con id " + req.params.mensajeId
            });
        });
};

// Update a mensaje identified by the mensajeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "El mensaje no puede estar vacio"
        });
    }
    const datosMensajes = {
        nombre: req.body.nombre,
        correoMensaje: req.body.correoMensaje,
        mensaje: req.body.mensaje
    };
    // Encontrar el mensaje y actualizarlo con el body del request
    Mensaje.findByIdAndUpdate(req.params.mensajeId, datosMensajes, { new: true })
        .then(mensaje => {
            if (!mensaje) {
                return res.status(404).send({
                    message: "No se ha encontrado un mensaje con el id " + req.params.mensajeId
                });
            }
            res.send(mensaje);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se ha encontrado un mensaje con el id " + req.params.mensajeId
                });
            }
            return res.status(500).send({
                message: "Error actualizando el mensaje con id " + req.params.mensajeId
            });
        });
};

// Eliminar un mensaje con el id especificado en el request
exports.delete = (req, res) => {
    Mensaje.findByIdAndRemove(req.params.mensajeId)
        .then(mensaje => {
            if (!mensaje) {
                return res.status(404).send({
                    message: "Mensaje no encontrado con id " + req.params.mensajeId
                });
            }
            res.send({ message: "Mensaje eliminado successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Mensaje no encontrado con id " + req.params.mensajeId
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar el mensaje con id " + req.params.mensajeId
            });
        });
};
