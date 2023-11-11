const ProductoModel = require("../models/producto.model")

let response = {
    msg:"",
    exito:false,
}


exports.create = async (req,res) => {


    let producto = new ProductoModel({
        nombreProducto: req.body.nombreProducto,
        descripcionProducto: req.body.descripcionProducto,
        presentacionProducto: req.body.presentacionProducto,
        pesoProducto: req.body.pesoProducto,
        proveedorProducto: req.body.proveedorProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto,
        monedaProducto: req.body.monedaProducto,
        formatoProducto: req.body.formatoProducto,
        volumenLiquidoProducto: req.body.volumenLiquidoProducto,
        tipoFraganciaProducto: req.body.tipoFraganciaProducto,
        cantidadProducto: req.body.cantidadProducto
    })

    if(req.file) {
        const {filename} = req.file
        producto.setImgUrl(filename)
        console.log("file recibido")
    }



    

    try {
        const respuesta = await producto.save()
        response.exito = true
        response.msg = "El producto se guardó con exito"
        res.send(respuesta)
    } catch (err) {
        console.error(err),
        response.exito = false,
        response.msg = "Error al intentar Guardar el producto"
        
        
        return;
    }

    //Obtener id de producto 

    







}