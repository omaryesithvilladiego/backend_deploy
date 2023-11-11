const EstudianteModel = require("../../models/estudiante/estudiante.model")
const mongoose = require("mongoose")
const transporter = require('../../helpers/mail')
const { ObjectId } = require("mongodb")
const usuarioModel = require("../../models/usuario.model")



exports.delete = async (req,res) => {
  let response = {
    msg: "",
    exito: false,
  }


  try {
    await usuarioModel.deleteOne({idUsuarioRegistro:req.body._id})
    await EstudianteModel.deleteOne({_id:req.body._id})
    response.exito = true
    response.msg = 'El estudiante se ha eliminado correctamente'
    res.send(response)
    
  } catch (error) {
    console.log(error)
    response.exito = false
    response.msg = 'El estudiante no se pudo eliminar'
    res.send(response)
  }
}



exports.obtenerEstudiante = async (req, res) => {
  let response = {
    msg: "",
    exito: false,
  }

  try {
    const estudiantes = await EstudianteModel.find({})
  res.send(estudiantes)
  response.msg = 'Los estudiantes obtenidos correctamente'
  response.exito = true
    
  } catch (error) {
    console.log(error)

  }

  




}


exports.create = async (req,res) => {





    function generarUsuario() {
        
        var correo = req.body.correoInstitucionalEstudiante;

        var usuario = correo.slice(0,-17)
      
      
        return usuario;
      }
    
      function generarContraseña() {
        var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
        var longitud = 10;
        var contraseña = '';
      
        for (var i = 0; i < longitud; i++) {
          var indice = Math.floor(Math.random() * caracteres.length);
          contraseña += caracteres[indice];
        }
      
        return contraseña;
      }

      
      
    
      const user = generarUsuario()
      const passw = generarContraseña()
      const mail = req.body.correoInstitucionalEstudiante



    const date = "2023-02-01"
    let response = {
        msg:"",
        exito:false,
        _id: null,
        user:user,
        passw:passw
    }

 

    let estudiante = new EstudianteModel({



        nombresEstudiante: req.body.nombresEstudiante,
        apellidosEstudiante: req.body.apellidosEstudiante,
        fechaIngresoEstudiante: req.body.fechaIngresoEstudiante,
        correoInstitucional: req.body.correoInstitucionalEstudiante,
        direccionEstudiante: {
            calle: req.body.direccionEstudiante.calle,
            numero: req.body.direccionEstudiante.numero,
            pais: req.body.direccionEstudiante.pais,
            ciudad: req.body.direccionEstudiante.ciudad,
            codigoPostal: req.body.direccionEstudiante.codigoPostal,
            barrio:req.body.direccionEstudiante.barrio
        },
        cedulaEstudiante: req.body.cedulaEstudiante,
        celularEstudiante: req.body.celularEstudiante,
        codigoEstudiante: req.body.codigoEstudiante,
        fechaNacimientoEstudiante:req.body.fechaNacimientoEstudiante,
        campusEstudiante: req.body.campusEstudiante,
        fechaRetiroEstudiante: date
    })



    const verificarCorreo = await EstudianteModel.findOne({correoInstitucional: mail})

    if(verificarCorreo === null) {

      try {
        const respuesta = await estudiante.save()
        response.exito = true
        response.msg="El estudiante ha sido guardado en la base de datos"
        let obtenerId = respuesta._id
        let idUser = obtenerId._id
        response._id = idUser
        res.send(response)
    
            const resultSendMail = await transporter.sendMail({
               from: "omar.villadiegoc@campusucc.edu.co",
               to:mail,
               subject:'Usuario y contraseña de incio de sesión',
               body:'Este es tu codigo',
               text: "Este es tu usuario y contraseña",
               html: `<div> Tu usuario es: ${user}, tu contraseña es: ${passw}, se sugiere cambiar la contraseña al iniciar sesión </div>`
           },(err) => {
            console.log(err)
        });
    } catch (err) {
        console.log(err)
        response.exito = false
        response.msg = "Error al guardar el estudiante, revisar..."
        res.send(response)
        return
    }
    } else {
      response.exito = false
      response.msg = 'El correo del estudiante ya se encuentra registrado'
      res.send(response)
    }








}