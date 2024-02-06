const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('dotenv').config()


const semilleroSchema = new Schema({
    nombreSemillero: {
        type:String,
        require:true
    },
    ciudadSemillero:{
        type:String,
        require:true
    },
    paisSemillero:{
        type:String,
        require:true
    },
    jefeSemillero: {
        type:String,
        require:true
    },
    identificacionJefeSemillero: {
        type:Number,
        require:true
    },
    misionSemillero: {
        type:String
    },
    visionSemillero: {
        type:String
    }
})

const Semillero = mongoose.model("semillero", semilleroSchema);

module.exports = Semillero;
