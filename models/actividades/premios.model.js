const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require("dotenv").config();


const PremioSchema = new Schema({
    nombreProyecto: {
        type:String,
        require:true
    },
    paisPremio: {
        type:String,
        require:true
    },
    ciudadPremio: {
        type:String,
        require:true
    },
    universidadPremio: {
        type:String,
        require:true
    },
    proyectoPremioUrl: {
        type:String,
        require:true
    },
    fechaPremio: {
        type:Date,
        require:true
    },
    fotosPremioUrl: {
        type:String,
        require:true
    },
    certificadoPremioUrl: {
        type:Date,
        require:true
    },
    idEstudiantePremios: {
        type:ObjectId,
        require:true
    }
})

const Premio = mongoose.model("premio", PremioSchema)
module.exports = Premio