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
    opcionTrabajoDeGrado:  {
        actaTrabajoGradoUrl: {
            type:String
        },
        actaInvestigacionUrl: {
            type:String
        },
        repositorioUcc: {
            type:String
        },
    },
    idEstudianteProyecto: {
        type:ObjectId,
        require:true
    },
    estadoPonencia: {
        type:String,
        require:true
    }




})



const Proyecto = mongoose.model("proyecto",  ProyectoSchema)
module.exports = Proyecto