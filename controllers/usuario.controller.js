const UsuarioModel = require("../models/usuario.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const usuarioModel = require("../models/usuario.model")
const CambiosContraseñaModel = require('../models/seguridad/cambiosContraseña.model')
const EstudianteModel = require('../models/estudiante/estudiante.model')
const transporter = require('../helpers/mail')
const { ObjectId } = require("mongodb")
const fs = require('fs');





exports.createuserRoot = async (req,res) => {

    let hashedpass = crypto.createHash("sha512").update("0000").digest("hex")




    let usuario = new UsuarioModel({
        nombreUsuario: "root",
        contraseñaUsuario: hashedpass,
    })


    try {
        const response = usuario.save()
        res.send("El usurio se guardó correctamente en la base de datos")
    } catch (error) {
        res.send("Error al guardar el usuario root")
        console.log(error)
    }


    

}

exports.passwordRecovery = async (req,res) => {
     let response = {
        status: false,
        msg:'',
        correo: false
    }

    const correoElectronico = req.body.correoElectronico

    function generarNumeroAleatorio() {
        // Genera un número aleatorio entre 1000 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        return numeroAleatorio;
      }

      const numero = generarNumeroAleatorio()
      
    
    let cambioContra = new CambiosContraseñaModel({
        correoElectronicoUsuario:correoElectronico,
        codigoSeguridad:numero
    })


    try {
      const respuesta =  await EstudianteModel.findOne({correoInstitucional:correoElectronico})

      if(respuesta) {
        await cambioContra.save()
        response.msg = 'Todo fue un exito'
        response.status = true
        response.correo = true
        res.send(response)
        const resultSendMail = await transporter.sendMail({
            from: "omar.villadiegoc@campusucc.edu.co",
            to:correoElectronico,
            subject:'Codigo de recuperación',
            body:'Este es tu codigo',
        
            html: `<div>Codigo de Seguridad: </br> ${numero} </div>`
        },(err) => {
         console.log(err)
         response.msg = 'No se pudo enviar el correo'
         response.status = false
         res.send(response)

     });

     return
      }

      response.msg = "El correo electronico no existe"
      response.status = false
      res.send(response)

        
    } catch (error) {
        console.log(error)
        response.msg = 'Ocurrió un error'
        response.status = false
        res.send(response)
    }







}

exports.changePass = async (req,res) => {
    
    let response = {
        status: false,
        msg:''
    }


    const pass = req.params.newPassword
    let hashedpass = crypto.createHash("sha512").update(pass).digest("hex")
    const idUsuario = req.params.idUsuario
    try {
        await usuarioModel.findOneAndUpdate({idUsuarioRegistro:idUsuario},{contraseñaUsuario: hashedpass})
        response.msg = "La contraseña se actualizó con exito"
        response.status = true
        res.send(response)
        
    } catch (error) {
        console.log(error)
        response.status = false
        response.msg = 'Error al intentar actualizar la contraseña'
        res.send(response)
    }
}




exports.login = async (req,res) => {
    let hashedpass = crypto.createHash("sha512").update(req.body.contraseñaUsuario).digest("hex")
    
    try {
        const data = await UsuarioModel.findOne({
            nombreUsuario: req.body.nombreUsuario,
            contraseñaUsuario: hashedpass,
    
        })


        let response = {
            token:null,
            data:data,
            type:null
           
        }
        
       
       if(data != null) {
        response.type = req.body.nombreUsuario
        response.token = jwt.sign({
            id: data._id,
            usuario: data.nombreUsuario
        }, "__recret__",
        {expiresIn: "12h"})
       }
      
       res.json(response)
       
        
    } catch (error) {
        console.log(error)
        
    }
   

}


exports.usuariosDisponibleles = async (req,res) => {

    let response = {
        msg: "",
        status: false
    }


    try {

        const data = await usuarioModel.find({})
        res.send(data)
        
    } catch (
        err
    ) {
        console.log(err)
        response.msg="Algo ocurrió mal"
        response.status=false
        
    }


}




exports.agregarFotoPerfil = async (req, res) => {
    const idUsuario = req.params.idUsuario;
    let fotoPerfilUrl = '';

    const response = {
        msg: "",
        exito: false
    };

    let dataEs = null

    let binaryData = null
   
   // Asegúrate de que req.body.imagen contiene una cadena Base64 válida
if (/^data:image\/\w+;base64,/.test(req.body.imagen)) {
    // Elimina el encabezado de la cadena Base64
    const base64Data = req.body.imagen.replace(/^data:image\/\w+;base64,/, '');
  
    // Decodifica la cadena Base64 a datos binarios
    binaryData = Buffer.from(base64Data, 'base64');
    
    const host = process.env.API_HOST;
    const port = process.env.API_PORT;
  
    // Escribe los datos binarios en un archivo
     fs.writeFile(`${host}:${port}/public/perfil/`, binaryData, 'binary', (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
      }
  
      console.log('Archivo guardado correctamente');
    });
  } else {
    console.error('La cadena proporcionada no es una cadena Base64 válida');
  }


 
        
       

    try {
        const respuesta = await UsuarioModel.findOneAndUpdate(
            { idUsuarioRegistro: idUsuario }, 
            { fotoPerfilUrl: fotoPerfilUrl },
            { new: true } // Para devolver el documento modificado
        );

        if (respuesta) {
            response.exito = true;
            response.msg = "La foto de perfil se ha agregado exitosamente";
            res.send(response);
        } else {
            response.msg = "No se encontró un usuario con el ID proporcionado";
            res.status(404).send(response);
        }
    } catch (err) {
        console.log(err);
        response.msg = "Error al guardar la foto de perfil, revisar...";
        res.status(500).send(response);
    }
};


exports.create = async (req, res) => {
    const response = {
        msg: "",
        status: false
    
    }

    console.log(req.body)

    let hashedpass = crypto.createHash("sha512").update(req.body.contraseñaUsuario).digest("hex")



    let usuario = new UsuarioModel({
        nombreUsuario: req.body.nombreUsuario,
        contraseñaUsuario: hashedpass,
        idUsuarioRegistro: req.body.idUsuarioRegistro
    })

    try {
        const respuesta = await usuario.save()
        response.msg = "El usuario se guardó en la base de datos, revisa tu correo electronico, te enviamos tu usuario y contrasena"
        response.status = true
        res.send(respuesta)
        
    } catch (error) {
        console.log(err)
        response.msg = "Error al guardar el usuario"
        response.status = false
        res.send(response)
        return
    }



}