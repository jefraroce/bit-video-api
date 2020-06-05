const Plan = require('./plan.modelo');
const { responder } = require('../../utilidades/funciones')

// Create and Save a new Plan
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido del Plan no puede estar vacio"
        });
    }

    // Create a Plan
    const plan = new Plan({
        proyectoId: req.body.proyectoId,
        descripcionPlan: req.body.descripcionPlan,
        nombrePlan: req.body.nombrePlan,
        valor: req.body.valor
    });

    // Save Plan in the database
    plan.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error creando el Plan."
            });
        });
};

// Retrieve and return all plans from the database.
exports.findAll = (req, res) => {
    Plan.find(req.query)
        .then(plans => {
            res.send(plans);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ha ocurrido algun error obteniendo los plans."
            });
        });
};

// Encontrar un plan con el planId
exports.findOne = (req, res) => {
    Plan.findById(req.params.planId)
        .then(plan => {
            if (!plan) {
                return res.status(404).send({
                    message: "Plan no encontrado con id " + req.params.planId
                });
            }
            res.send(plan);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Plan no encontrado con id " + req.params.planId
                });
            }
            return res.status(500).send({
                message: "Error obteniendo el plan con id " + req.params.planId
            });
        });
};

// Update a plan identified by the planId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "El plan no puede estar vacio"
        });
    }
    const plan = new Plan({
        proyectoId: req.body.proyectoId,
        descripcionPlan: req.body.descripcionPlan,
        nombrePlan: req.body.nombrePlan,
        valor: req.body.valor
    });
    // Encontrar el plan y actualizarlo con el body del request
    Plan.findByIdAndUpdate(req.params.planId, plan, { new: true })
        .then(plan => {
            if (!plan) {
                return res.status(404).send({
                    message: "No se ha encontrado un plan con el id " + req.params.planId
                });
            }
            res.send(plan);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No se ha encontrado un plan con el id " + req.params.planId
                });
            }
            return res.status(500).send({
                message: "Error actualizando el plan con id " + req.params.planId
            });
        });
};

// Eliminar un plan con el id especificado en el request
exports.delete = (req, res) => {
    Plan.findByIdAndRemove(req.params.planId)
        .then(plan => {
            if (!plan) {
                return res.status(404).send({
                    message: "Plan no encontrado con id " + req.params.planId
                });
            }
            res.send({ message: "Plan eliminado successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Plan no encontrado con id " + req.params.planId
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar el plan con id " + req.params.planId
            });
        });
};
