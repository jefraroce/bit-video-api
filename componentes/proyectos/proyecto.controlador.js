const Proyecto = require('./proyecto.modelo');
const { responder } = require('../../utilidades/funciones')

// Create and Save a new Proyecto
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "El contenido del Proyecto no puede estar vacio"
        });
    }

    // Create a Proyecto
    const proyecto = new Proyecto({
        proyectoId: req.body.proyectoId,
        nombreProyecto: req.body.nombreProyecto,
        descripcionProyecto: req.body.descripcionProyecto,
        portada: req.body.portada,
        enlace: req.body.enlace  
    });

    // Save Proyecto in the database
    proyecto.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error creando el Proyecto."
            });
        });
};

// Retrieve and return all proyectos from the database.
exports.findAll = (req, res) => {
    Proyecto.find()
        .then(proyectos => {
            res.send(proyectos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error obteniendo los proyectos."
            });
        });
};

// Encontrar un proyecto con el proyectoId
exports.findOne = (req, res) => {
    Proyecto.findById(req.params.proyectoId)
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).send({
                    message: "Proyecto no encontrado con id " + req.params.proyectoId
                });
            }
            res.send(proyecto);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Proyecto no encontrado con id " + req.params.proyectoId
                });
            }
            return res.status(500).send({
                message: "Error obteniendo el proyecto con id " + req.params.proyectoId
            });
        });
};

// Update a proyecto identified by the proyectoId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "El proyecto no puede estar vacio"
        });
    }
    const proyecto = new Proyecto({
        proyectoId: req.body.proyectoId,
        nombreProyecto: req.body.nombreProyecto,
        descripcionProyecto: req.body.descripcionProyecto,
        portada: req.body.portada,
        enlace: req.body.enlace  
    });
    // Encontrar el proyecto y actualizarlo con el body del request
    Proyecto.findByIdAndUpdate(req.params.proyectoId, proyecto, { new: true })
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).send({
                    message: "No se ha encontrado un proyecto con el id " + req.params.proyectoId
                });
            }
            res.send(proyecto);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se ha encontrado un proyecto con el id " + req.params.proyectoId
                });
            }
            return res.status(500).send({
                message: "Error actualizando el proyecto con id " + req.params.proyectoId
            });
        });
};

// Eliminar un proyecto con el id especificado en el request
exports.delete = (req, res) => {
    Proyecto.findByIdAndRemove(req.params.proyectoId)
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).send({
                    message: "Proyecto no encontrado con id " + req.params.proyectoId
                });
            }
            res.send({ message: "Proyecto eliminado successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Proyecto no encontrado con id " + req.params.proyectoId
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar el proyecto con id " + req.params.proyectoId
            });
        });
};