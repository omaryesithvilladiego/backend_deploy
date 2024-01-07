const { ObjectId } = require("mongodb")
const moongose = require("mongoose")
const Schema = moongose.Schema

const cambiosContraseñaModel = new Schema({
    correoElectronicoUsuario: {
        type: String,
        require: true
    },
    codigoSeguridad: {
        type:Number,
        require:true
    }
})

module.exports = moongose.model('cambioscontraseña', cambiosContraseñaModel )