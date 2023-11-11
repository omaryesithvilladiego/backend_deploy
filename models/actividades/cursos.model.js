const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")
require("dotenv").config();


const Schema = mongoose.Schema

const CursoSchema = new Schema({
    nombreCurso: {
        type:String,
        require:true
    },
    numeroHorasCurso: {
        type:Number,
        require:true
    },
    institucionCurso: {
        type:String,
        require:true
    },
    fechaInicioCurso: {
        type:Date,
        require:true

    },
    fechaFinalizacionCurso: {
        type:Date,
        require:true

    },
    
    paisCurso: {
        type:String,
        
    },
    ciudadCurso: {
        type:String,
       
    },
    modalidadCurso: {
        type:String,
        require:true
    },
    certificadoCursoUrl: {
        type:String,
        require:true
    },
    idEstudianteCurso: {
        type:ObjectId,
        require:true
    }

})

CursoSchema.methods.setCertificadoCursoUrl = function setCertificadoCursoUrl (filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.certificadoCursoUrl = `${host}:${port}/public/${filename}`

}




const Curso = mongoose.model("curso", CursoSchema)
module.exports = Curso

