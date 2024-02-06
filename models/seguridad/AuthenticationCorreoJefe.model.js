
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AuthenticationCorreoModel = new Schema({
    correoElectronicoUsuario: {
        type: String,
        require: true
    },
    codigoSeguridad: {
        type:Number,
        require:true
    },
    correoVerificado: {
        type:Boolean,
    
    }
})

module.exports = mongoose.model('auth', AuthenticationCorreoModel )