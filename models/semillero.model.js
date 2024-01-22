const moongose = require('mongoose')
const Schema = moongose.Schema
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
    jefeSemillero: {
        type:String,
        require:true
    },
    misionSemillero: {
        type:String
    },
    visionSemillero: {
        type:String
    }
})
