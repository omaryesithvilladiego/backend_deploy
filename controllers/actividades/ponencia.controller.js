const PonenciaModel = require("../../models/actividades/ponencia.model")


exports.obtener = async (req,res) => {
    let response = {
        msg:'',
        exito:false
    }

    try {

        const data = await PonenciaModel.find({})
        response.msg = 'Las ponencias se han obtenido con correctamente'
        response.exito = true
        res.send(data)
    } catch (error) {
        console.log(error)
        response.msg = 'Error al obtener las ponencias'
        response.exito = false
        res.send(response)
    }



}
 
exports.create = async (req,res) => {
    let response = {
        msg:"",
        exito:false
    }

    console.log(req.body)

    let ponencia = new PonenciaModel({
        nombreEventoPonencia: req.body.nombreEventoPonencia,
        modalidadEventoPonencia: req.body.modalidadEventoPonencia,
        paisEventoPonencia: req.body.paisEventoPonencia,
        ciudadEventoPonencia: req.body.ciudadEventoPonencia,
        certificadoEventoUrlPonencia: req.body.certificadoEventoUrlPonencia,
        posterEventoUrlPonencia: req.body.posterEventoUrlPonencia,
        presentacionEventoUrlPonencia: req.body. presentacionEventoUrlPonencia,
        imagenMemoriasUrlPonencia: req.body.imagenMemoriasUrlPonencia,
        fechaPonencia: req.body.fechaPonencia,
        idEstudiantePonencia: req.body.idEstudiantePonencia,
        estadoPonencia: 'Pendiente'

    })

    console.log(req.files)

    if(req.files) {
        const certificado = req.files.certificadoEventoUrlPonencia[0].filename
        const presentacionEvento = req.files.presentacionEventoUrlPonencia[0].filename
        const poster = req.files.posterEventoUrlPonencia[0].filename
        const imagenMemorias = req.files.imagenMemoriasUrlPonencia[0].filename
        ponencia.setCertificadoEventoUrlPonencia(certificado)
        ponencia.setPresentacionEventoUrlPonencia(presentacionEvento)
        ponencia.setPosterEventoUrlPonencia(poster)
        ponencia.setImagenMemoriasUrlPonencia(imagenMemorias)

    }







    try {
        const respuesta = await ponencia.save()
        response.exito = true
        response.msg="La ponencia ha sido guardado en la base de datos"
        res.send(response)
    } catch (err) {
        console.log(err)
        response.exito = false
        response.msg = "Error al guardar la ponencia, revisar..."
        return
    }




}