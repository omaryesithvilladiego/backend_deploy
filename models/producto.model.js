const moongose = require("mongoose")
const Schema = moongose.Schema
require("dotenv").config();

const productoSchema = new Schema({

    nombreProducto: {
        type:String,
        require:true,
        max:6000
    },
    descripcionProducto: {
        type:String,
        require:true,
        max:6000
    },
    presentacionProducto: {
        type:String,
        require:true,
        max:6000

    },
    proveedorProducto: {
        type:String,
        max:6000
    },
    pesoProducto:{
        type:Number,
        require:true,
        max:6000
    },
    marcaProducto: {
        type:String,
        max:6000
    },
    precioProducto: {
        type:Number,
        require:true,
        max:6000
    },
    monedaProducto: {
        type:String,
        require:true,
        max:6000
    },
    formatoProducto: {
        type:String,
        max:6000
    },
    volumenLiquidoProducto: {
        type:Number,
        require:true,
        max:6000
    },
    tipoFraganciaProducto: {
        type:String,
        require:true,
        max:6000
    },
    cantidadProducto: {
        type:Number,
        require:true,
        max:6000
    },
    
    imgUrl: {
        type:String,
        require:true,
        max:6000
    }

})


productoSchema.methods.setImgUrl = function setImgUrl (filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.imgUrl = `${host}:${port}/public/${filename}`

}


module.exports = moongose.model("producto", productoSchema)