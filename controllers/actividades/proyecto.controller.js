const ProyectoModel = require("../../models/actividades/proyecto.model")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId


exports.create = async (req,res) => {
   
    let message= {
        msg:"",
        exito:false
    }

    console.log(req.body)

    let proyecto = new ProyectoModel({
        nombrePremio: req.body.nombrePremio,
        objetivosProyecto: req.body.objetivosProyecto,
        convocatoriaProyecto: req.body.convocatoriaProyecto,
        resultadoProyecto: req.body.resultadoProyecto,
        certificadoResultadoPremoUrl: req.body.certificadoResultadoPremioUrl,
        actaTrabajoGradoUrl: req.body.actaTrabajoGradoUrl,
        actaInvestigacionUrl: req.body.actaInvestigacionUrl,
        repositorioUcc: req.body.repositorioUcc,
        idEstudianteProyecto: req.body.idEstudianteProyecto

    })

  

        if(req.files) {
         const certificado = req.files.certificadoResultadoPremioUrl[0].filename
         const actaGrado = req.files.actaTrabajoGradoUrl[0].filename
         const actaInves = req.files.actaInvestigacionUrl[0].filename
         proyecto.setCertificadoResultadoPremioUrl(certificado)
         proyecto.setActaTrabajoGradoUrl(actaGrado)
         proyecto.setActaInvestigacionUrl(actaInves)
     }


   


     try {
         await proyecto.save()
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