const ProyectoModel = require("../../models/actividades/proyecto.model")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId


exports.create = async (req,res) => {
    const objectId = new ObjectId();
    let message= {
        msg:"",
        exito:false
    }

    let proyecto = new ProyectoModel({
        nombrePremio: req.body. nombrePremio,
        objetivosProyecto: req.body. objetivosProyecto,
        convocatoriaProyecto: req.body.convocatoriaProyecto,
        resultadoProyecto: req.body.resultadoProyecto,
        certificadoResultadoPremoUrl: req.body.certificadoResultadoPremoUrl,
        opcionTrabajoDeGrado: {
            actaTrabajoGradoUrl: req.body.opcionTrabajoDeGrado.actaTrabajoGradoUrl,
            actaInvestigacionUrl: req.body.opcionTrabajoDeGrado.actaInvestigacionUrl,
            repositorioUcc: req.body.opcionTrabajoDeGrado.repositorioUcc
        },
        idEstudianteProyecto: objectId

    })

    try {
        const response = await proyecto.save()
        message.exito = true
        message.msg="El proyecto ha sido guardado en la base de datos"
        res.send(message)
    } catch (err) {
        console.log(err)
        message.exito = false
        message.msg = "Error al guardar el proyecto, revisar..."
        res.send(message)
        return
    }




}