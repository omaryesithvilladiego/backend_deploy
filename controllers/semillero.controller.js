const SemilleroModel = require('../models/semillero.model')

exports.create = async (req,res) => {
    let response = {
        msg:'',
        exito:false,
        idSemilleroCreated:null
    }


    let semillero = new SemilleroModel({
        nombreSemillero: req.body.nombreSemillero,
        ciudadSemillero: req.body.ciudadSemillero,
        paisSemillero: req.body.paisSemillero,
        jefeSemillero:req.body.jefeSemillero,
        identificacionJefeSemillero: req.body.identificacionJefeSemillero,
        misionSemillero: req.body.misionSemillero,
        visionSemillero: req.body.visionSemillero
    })

    

    try {
        const semilleroData = await semillero.save()
        response.msg = 'El semillero se ha guardado correctamente'
        response.exito = true
        response.idSemilleroCreated = semilleroData._id
        res.send(response)
        
        
    } catch (error) {
        console.log(error)
        response.msg = 'Error al guardar el semillero'
        response.exito = false
        res.send(response)
    }


}