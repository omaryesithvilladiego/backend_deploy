const ProductoModel = require("../models/producto.model.second")


let response = {
    msg:"",
    exito:false,
}


exports.create = async (req,res) => {


    let producto = new ProductoModel({
        nombreProducto: req.body.nombreProducto,
        descripcionProducto: req.body.descripcionProducto,
        presentacionProducto: req.body.presentacionProducto,
        proveedorProducto: {
          nombreProveedor: req.body.proveedorProducto.nombreProveedor,
          direccionProveedor: req.body.proveedorProducto.direccionProveedor,
          ciudadProveedor: req.body.proveedorProducto.ciudadProveedor
        },
        marcaProducto: req.body.marcaProducto,
        precioProducto: {
          monedaProducto: req.body.precioProducto.monedaProducto,
          precioUnitario: req.body.precioProducto.precioUnitario,
          precioAlPorMayor: req.body.precioProducto.precioAlPorMayor
        },
        formatoProducto: req.body.formatoProducto,
        volumenLiquidoProducto: req.body.volumenLiquidoProducto,
        tipoFraganciaProducto: req.body.tipoFraganciaProducto,
        cantidadProducto: req.body.cantidadProducto,
        imgUrl: req.body.imgUrl,
        imgUrl2: req.body.imgUrl2
    })

    console.log(req.files)


     if(req.files) {
          const filename = req.files.imgUrl[0].filename
          const filename2 = req.files.imgUrl2[0].filename
        producto.setImgUrl(filename)
        producto.setImgUrl2(filename2)

         
      }

  


    

    try {
        const respuesta = await producto.save() 
        response.exito = true
        response.msg = "El producto se guardó con exito"
        res.send(respuesta._id)

        


    } catch (err) {
        console.error(err)
        response.exito = false
        response.msg = "Error al intentar Guardar el producto"
        
        
        return;
    }

    //Obtener id de producto 

    







}

exports.saveImgUrl2 = async (req,res) => {
    const objectId = req.body.objectId
    
    let producto = new ProductoModel({
        imgUrl2: req.body.imgUrl2
    })


    console.log(objectId)

    
    if(req.file) {
        const {filename} = req.file

        try {
            const updated = await ProductoModel.findOneAndUpdate({
                _id: objectId,
            }, {
               imgUrl2: filename,
            }, ).then((result) => {
                console.log(result)
                console.log(updated)
            }).catch((err) => {
                console.log(err)
            });
            
             
        } catch (err) {
            console.log(err)
        }
        
    }

   

   
    



}