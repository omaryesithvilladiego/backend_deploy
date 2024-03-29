const { ObjectId } = require("mongodb")
const moongose = require("mongoose")
const Schema = moongose.Schema


const usuarioSchema = new Schema({
    nombreUsuario: {
        type:String,
        require: true,
        max: 6000
    },
    contraseñaUsuario: {
        type:String,
        require: true,
        max: 6000
    },
    idUsuarioRegistro: {
        type:ObjectId,
       
        
    },
    fotoPerfilUrl: 
    {

        type:String

    },
    fotoPortadaUrl:
    {

        type:String

    }
})


module.exports = moongose.model('usuarios', usuarioSchema)


