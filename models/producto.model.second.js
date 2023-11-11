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

    ubicacionProducto: {
        numeroPasillo: {
            type:Number,
            require:true,
            max:6000
        },
        numeroEstantePasillo: {
            type:Number,
            require:true,
            max:6000
        }, numeroContenedor: {
            type:Number,
            require:true,
            max:6000
        }
        
    },
 
    proveedorProducto: {
        nombreProveedor: {
            type:String,
            require:true,
            max:6000
        },
        direccionProveedor:{
            type:String,
            require:true,
            max:6000
        },
        ciudadProveedor: {
            type:String,
            require:true,
            max:6000
        },
        telefonoProveedor: {
            type:Number,
            require:true,
            max:6000
        }
    },

    marcaProducto: {
        type:String,
        max:6000
    },

    precioProducto: {
        monedaProducto: {
            type:String,
            require:true,
            max:6000
        },
        precioUnitario:{
            type:Number,
            require:true,
            max:6000
        },
        precioAlPorMayor: {
            type:Number,
            require:true,
            max:6000
        }
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
    }, imgUrl2: {
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

productoSchema.methods.setImgUrl2 = function setImgUrl2 (filename) {
    const host = process.env.API_HOST
    const port = process.env.API_PORT

    this.imgUrl2 = `${host}:${port}/public/${filename}`

}




module.exports = moongose.model("productoSecond", productoSchema)