const CursoModel = require("../../models/actividades/cursos.model")

exports.create = async (req,res) => {
    let response = {
        msg:"",
        exito:false
    }

    let curso = new CursoModel({
        nombreCurso:req.body.nombreCurso,
        numeroHorasCurso: req.body.numeroHorasCurso,
        institucionCurso: req.body.institucionCurso,
        fechaInicioCurso: req.body.fechaInicioCurso,
        fechaFinalizacionCurso: req.body.fechaFinalizacionCurso,
        paisCurso: req.body.paisCurso,
        ciudadCurso: req.body.ciudadCurso,
        modalidadCuso:  req.body.modalidadCuso,
        certificadoCursoUrl: req.body.certificadoCursoUrl,
        idEstudianteCurso: req.body.idEstudianteCurso
    })

    try {
        const respuesta = await curso.save()
        response.exito = true
        response.msg="El curso ha sido guardado en la base de datos"
        res.send(response)
    } catch (err) {
        console.log(err)
        response.exito = false
        response.msg = "Error al guardar el curso, revisar..."
        res.send(response)
        return
    }




}