const PonenciaModel = require("../../models/actividades/ponencia.model")


exports.obtenerTodas = async (req,res) => {
    let response = {
        msg:'',
        exito:false
    }

 

    try {

        const data = await PonenciaModel.find({})
        response.msg = 'Las ponencias se han obtenido correctamente'
        response.exito = true
        res.send(data)
    } catch (error) {
        console.log(error)
        response.msg = 'Error al obtener las ponencias'
        response.exito = false
        res.send(response)
    }


}


exports.obtener = async (req,res) => {
    let response = {
        msg:'',
        exito:false
    }

    const idUsuario = req.params.idUsuario

    try {

        const data = await PonenciaModel.find({idEstudiantePonencia:idUsuario})
        response.msg = 'Las ponencias se han obtenido correctamente'
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



    let ponencia = new PonenciaModel({
        nombreEventoPonencia: req.body.nombreEventoPonencia,
        modalidadEventoPonencia: req.body.modalidadEventoPonencia,
        paisEventoPonencia: req.body.paisEventoPonencia,
        ciudadEventoPonencia: req.body.ciudadEventoPonencia,
        certificadoEventoUrlPonencia: req.body.certificadoEventoUrlPonencia,
        posterEventoUrlPonencia: req.body.posterEventoUrlPonencia,
        presentacionEventoUrlPonencia: req.body.presentacionEventoUrlPonencia,
        imagenMemoriasUrlPonencia: req.body.imagenMemoriasUrlPonencia,
        fechaPonencia: req.body.fechaPonencia,
        idEstudiantePonencia: req.body.idEstudiantePonencia,
        estadoPonencia: 'Pendiente',
        colorEstadoPonencia: 'yellow'

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


exports.eliminarPonenciaYArchivos = async  (req, res) => {
    const ponenciaId = req.params.id; // Asumiendo que pasas el ID de la ponencia como parámetro en la URL
  
    try {
      // Obtener la ponencia para obtener las URL de las imágenes
      const ponencia = await PonenciaModel.findById(ponenciaId);
  
      // Verificar si la ponencia existe
      if (!ponencia) {
        return res.status(404).json({ mensaje: 'Ponencia no encontrada' });
      }
  
      // Eliminar las imágenes del almacenamiento local
      eliminarArchivoLocal(ponencia.certificadoEventoUrlPonencia);
      eliminarArchivoLocal(ponencia.posterEventoUrlPonencia);
      eliminarArchivoLocal(ponencia.presentacionEventoUrlPonencia);
      eliminarArchivoLocal(ponencia.imagenMemoriasUrlPonencia);
  
      // Eliminar la ponencia de la base de datos
      await PonenciaModel.findByIdAndRemove(ponenciaId);
  
      res.json({ mensaje: 'Ponencia y archivos eliminados exitosamente' });
    } catch (error) {
      console.error('Error al eliminar ponencia y archivos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
  
  // Función auxiliar para eliminar archivos del almacenamiento local
  function eliminarArchivoLocal(url) {
    const filePath = path.join(__dirname, '..', 'storage', 'ponencias', path.basename(url));
  
    // Eliminar el archivo
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
      } else {
        console.log(`Archivo ${filePath} eliminado con éxito`);
      }
    });
  }
  
