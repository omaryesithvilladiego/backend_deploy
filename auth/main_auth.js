const jwt = require("jsonwebtoken")



const auth = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const decoded = jwt.verify(token, "__recret__")
        console.log(decoded)
        req.usuario = decoded
        next()
    } catch (error) {
        res.status(401)
        res.json({code:4, msg:"No tiene autorizacion para ver el contenido", token:req.headers.authorization.split(" ")[1]})
        
        
    }
}

module.exports = auth