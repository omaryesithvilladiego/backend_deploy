const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require("dotenv").config();


const ProyectoSchema = new Schema({
    nombreProyecto: {
        type:String,
        require:true
    },
    objetivosProyecto:{
        type:String,
        require:true
    },
    convocatoriaProyecto: {
        type:String,
        require:true
    },
    resultadoProyecto:{
        type:String,
        require:true
    },
    certificadoResultadoPremioUrl: {
        type:String,
        require:true
    },
    
    actaTrabajoGradoUrl: {
            type:String,
            require:true
    },
    actaInvestigacionUrl: {
            type:String,
            require:true
    },
    repositorioUcc: {
    type:String
    
    },
  
    idEstudianteProyecto: {
        type:ObjectId,
        require:true
    },
    estadoProyecto: {
        type:String,
        require:true
    }




})


ProyectoSchema.methods.setCertificadoResultadoPremioUrl = function setCertificadoResultadoPremioUrl(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.certificadoResultadoPremioUrl = `${host}:${port}/public/proyectos/${filename}`

}


ProyectoSchema.methods.setActaTrabajoGradoUrl = function setActaTrabajoGradoUrl(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.actaTrabajoGradoUrl = `${host}:${port}/public/proyectos/${filename}`

}

ProyectoSchema.methods.setActaInvestigacionUrl = function setActaInvestigacionUrl(filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.actaInvestigacionUrl = `${host}:${port}/public/proyectos/${filename}`

}



const Proyecto = mongoose.model("proyecto",  ProyectoSchema)
module.exports = Proyecto