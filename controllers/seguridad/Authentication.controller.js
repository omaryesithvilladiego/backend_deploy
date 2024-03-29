const AuthModel = require("../../models/seguridad/AuthenticationCorreoJefe.model")

const transporter = require('../../helpers/mail')


exports.updateNumeroSemilleros = async (req,res) => {

    let response = {
        msg: '',
        status:false
    }

    const idSemilleroData = req.body.idSemillero
    const correoJefe = req.body.emailRegistro

    var numeroSemilleros = 0
    numeroSemilleros+=1
    

    try {

        await AuthModel.findOneAndUpdate({correoElectronicoUsuario:correoJefe},{idSemillero:[idSemilleroData]})
        await AuthModel.findOneAndUpdate({correoElectronicoUsuario:correoJefe},{numeroSemilleros:numeroSemilleros})
        response.msg = 'Todo fué un éxito'
        response.msg = true
        res.send(response)
    } catch (error) {
        console.log(error)
        response.msg = 'Error al actualizar los datos de la autenticación'
        response.msg = false
        res.send(response)
    }

    
    


}


exports.confirmCode = async (req,res) => {
    let response = {
        msg: '',
        status:false
    }

    const code = req.body.code

    try {

       await AuthModel.findOneAndUpdate({codigoSeguridad: code},{correoVerificado:true})
            response.msg = 'El correo se verificó'
            response.status = true
        res.send(response)
    } catch (error) {
        console.log(error)
        response.msg = 'Error'
        response.status = false
        res.send(response)
    }
}

exports.reenviarCode = async (req,res) => {

    let response = {
        msg: '',
        status: false
    }


    function generarNumeroAleatorio() {
        // Genera un número aleatorio entre 1000 y 9999 (ambos inclusive)
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        
        return numeroAleatorio;
      }

      let numero = generarNumeroAleatorio()
      mail = req.body.correoElectronico


      try {
        await AuthModel.findOneAndUpdate({correoElectronicoUsuario: mail},{codigoSeguridad:numero})
        const resultSendMail = await transporter.sendMail({
            from: "",
            to:mail,
            subject:'Codigo Seguridad',
            body:'Este es tu codigo de seguridad',
            html: `<div> Codigo de seguridad: ${numero} </div>`
        });
        response.msg = 'El codigo enviado con exito'
        response.status = true
        res.send(response)
      } catch (error) {
        console.log(error)
        response.msg = 'Error'
        res.send(response)
      }

    
  


}

exports.create = async (req,res, next) => {
    let response = {
        msg: '',
        status: false,
        procesoRegistro: false,
        correoVerificado: false,
        semilleroAgregado:false
    }

    function generarNumeroAleatorio() {
        // Genera un número aleatorio entre 1000 y 9999 (ambos inclusive)
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        
        return numeroAleatorio;
      }

      let numero = generarNumeroAleatorio()
      mail = req.body.correoElectronico

       let auth = new AuthModel({
        correoElectronicoUsuario: mail,
        codigoSeguridad:numero,
        correoVerificado:false,
        numeroSemilleros:0
    })

 
    try {
       
        const data = await AuthModel.findOne({ correoElectronicoUsuario: mail})
        if(data) {
            if(!data.correoVerificado) {
                response.msg = 'El correo ya tiene un proceso de registro iniciado, recibirá otro còdigo'
                response.procesoRegistro = true
                response.status = false
                res.send(response)
                return
            } else if(data.numeroSemilleros >= 1) {
                response.msg = 'Ya tiene un semillero registrado, no puede registrar más'
                response.procesoRegistro = true
                response.status = false
                response.semilleroAgregado = true
                res.send(response)
                return
            } else {
                response.msg = 'Su correo está verificado, añada un semillero'
                response.procesoRegistro = true
                response.status = false
                response.correoVerificado = true
                res.send(response)
                return
            } 
           
       }
     
        await auth.save()
        response.msg = "Codigo generado exitosamente"
        response.status = true
        res.send(response)
        console.log(response)

        const resultSendMail = await transporter.sendMail({
            from: "",
            to:mail,
            subject:'Usuario y contraseña de incio de sesión',
            body:'Este es tu codigo de seguridad',
            html: `<div> Codigo de seguridad: ${numero} </div>`
        });
    } catch (error) {
        response.msg = "Codigo generado con error"
        response.status = false
        console.log(error)
        res.send(response)
        console.log(response)
        AuthModel.findOneAndDelete({correoElectronicoUsuario: mail})
    }


}