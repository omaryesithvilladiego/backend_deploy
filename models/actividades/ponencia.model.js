const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
require("dotenv").config();


const PonenciaSchema = new Schema({
    nombreEventoPonencia: {
        type:String,
        require:true
    },
    modalidadEventoPonencia: {
        type:String,
        require:true
    },
    paisEventoPonencia: {
        type:String,
        require:true
    },
    ciudadEventoPonencia: {
        type:String,
        require:true
    },
    certificadoEventoUrlPonencia: {
        type:String,
        require:true
    },
    posterEventoUrlPonencia: {
        type:String,
        require:true
    },
    presentacionEventoUrlPonencia: {
        type:String,
        require:true
    },
    imagenMemoriasUrlPonencia: {
        type:String,
        require:true
    },
    fechaPonencia: {
        type:Date,
        require:true
    },
    idEstudiantePonencia: {
        type:ObjectId,
        require:true
    },
    estadoPonencia: {
        type:String ,
        require:true
    },
    colorEstadoPonencia: {
        type:String,
        
    }

    
    

   
})

PonenciaSchema.methods.setCertificadoEventoUrlPonencia = function setCertificadoEventoUrlPonencia(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.certificadoEventoUrlPonencia = `${host}/public/ponencias/${filename}`

}

PonenciaSchema.methods.setPosterEventoUrlPonencia = function setPosterEventoUrlPonencia(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.posterEventoUrlPonencia = `${host}/public/ponencias/${filename}`

}

PonenciaSchema.methods.setPresentacionEventoUrlPonencia = function setPresentacionEventoUrlPonencia(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.presentacionEventoUrlPonencia = `${host}/public/ponencias/${filename}`

}

PonenciaSchema.methods.setImagenMemoriasUrlPonencia = function setImagenMemoriasUrlPonencia (filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.imagenMemoriasUrlPonencia = `${host}/public/ponencias/${filename}`

}

const Ponencia = mongoose.model("ponencia", PonenciaSchema)

module.exports = Ponencia