const UsuarioModel = require("../models/usuario.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const usuarioModel = require("../models/usuario.model")



exports.login = async (req,res) => {
    let hashedpass = crypto.createHash("sha512").update(req.body.contraseñaUsuario).digest("hex")

    console.log(req.body)

    try {

        const data = await UsuarioModel.findOne({
            nombreUsuario: req.body.nombreUsuario,
            contraseñaUsuario: hashedpass,
    
        })

        let response = {
            token:null,
            data:data
           
        }
        
       if(data != null) {
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