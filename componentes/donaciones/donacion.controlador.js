const Donacion = require('./donacion.modelo');
const { enviarCorreo } = require('../../utilidades/funciones')
const Plan = require('../planes/plan.modelo')
const Proyecto =require('../proyectos/proyecto.modelo')

// Create and Save a new Donacion
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido del Donacion no puede estar vacio"
        });
    }
    console.log(req.body)
    // Create a Donacion
    const donacion = new Donacion({
        proyectoId: req.body.proyectoId,
        planId: req.body.planId,
        nombreDonante: req.body.nombreDonante,
        correoDonante: req.body.correoDonante,
        telefonoDonante: req.body.telefonoDonante
    });

    // Save Donacion in the database
    donacion.save()
        .then(data => {
            res.send(data);
Plan.findById(donacion.planId).then((infoPlan) => {
    Proyecto.findById(donacion.proyectoId).then((infoProyecto) => {
    const contenidoCorreo = 
        `<h1>${data.nombreDonante}</h1>
        <h3>Muchas Gracias por tu donación de ${infoPlan.valor}</h3>
        <h3>Para el proyecto ${infoProyecto.nombreProyecto}</h3>
        <h3>Recibiras el contenido y sus actualizaciones durante un año.</h3>
        <h2>Cordialmente,</h2> <br> <h3>Equipo Bit Video 📽️ </h3>`;
        
        enviarCorreo(data.correoDonante, 'Gracias por tu donación', contenidoCorreo)  
})})
                    
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error creando el Donacion."
            });
        });
};

// Retrieve and return all donacions from the database.
exports.findAll = (req, res) => {
    Donacion.find()
        .then(donaciones => {
            res.send(donaciones);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error obteniendo los donacions."
            });
        });
};

// Encontrar un donacion con el donacionId
exports.findOne = (req, res) => {
    Donacion.findById(req.params.donacionId)
        .then(donacion => {
            if (!donacion) {
                return res.status(404).send({
                    message: "Donacion no encontrado con id " + req.params.donacionId
                });
            }
            res.send(donacion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Donacion no encontrado con id " + req.params.donacionId
                });
            }
            return res.status(500).send({
                message: "Error obteniendo el donacion con id " + req.params.donacionId
            });
        });
};

// Update a donacion identified by the donacionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "El donacion no puede estar vacio"
        });
    }
    const donacion = new Donacion({
        proyectoId: req.body.proyectoId,
        planId: req.body.planId,
        nombreDonante: req.body.nombreDonante,
        correoDonante: req.body.correoDonante,
        telefonoDonante: req.body.telefonoDonante
    });
    // Encontrar el donacion y actualizarlo con el body del request
    Donacion.findByIdAndUpdate(req.params.donacionId, donacion, { new: true })
        .then(donacion => {
            if (!donacion) {
                return res.status(404).send({
                    message: "No se ha encontrado un donacion con el id " + req.params.donacionId
                });
            }
            res.send(donacion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se ha encontrado un donacion con el id " + req.params.donacionId
                });
            }
            return res.status(500).send({
                message: "Error actualizando el donacion con id " + req.params.donacionId
            });
        });
};

// Eliminar un donacion con el id especificado en el request
exports.delete = (req, res) => {
    Donacion.findByIdAndRemove(req.params.donacionId)
        .then(donacion => {
            if (!donacion) {
                return res.status(404).send({
                    message: "Donacion no encontrado con id " + req.params.donacionId
                });
            }
            res.send({ message: "Donacion eliminado successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Donacion no encontrado con id " + req.params.donacionId
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar el donacion con id " + req.params.donacionId
            });
        });
};
