const PremioModel = require("../../models/actividades/premios.model")

exports.create = async (req,res) => {
    let response = {
        msg:"",
        exito:false
    }

    let premio = new PremioModel({
        nombreProyecto: req.body.nombreProyecto,
        paisPremio: req.body.paisPremio,
        ciudadPremio: req.body.ciudadPremio,
        universidadPremio: req.body.universidadPremio,
        proyectoPremioUrl: req.body.proyectoPremioUrl,
        fechaPremio: req.body.fechaPremio,
        fotosPremioUrl: req.body.fotosPremioUrl,
        certificadoPremioUrl: req.body.certificadoPremioUrl,
        idEstudiantePremios: req.body.idEstudiantePremios

    })

    try {
        const response = await premio.save()
        response.exito = true
        response.msg="El premio ha sido guardado en la base de datos"
        res.send(response)
    } catch (err) {
        console.log(err)
        response.exito = false
        response.msg = "Error al guardar el premio, revisar..."
        return
    }




}