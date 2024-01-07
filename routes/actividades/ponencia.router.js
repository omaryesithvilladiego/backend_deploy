var express = require("express")
var router = express.Router()
const ponenciaController = require("../../controllers/actividades/ponencia.controller")
const upload = require("../../libs/storagePonencia")

router.post("/create-ponencia", upload, ponenciaController.create)
router.get('/obtener-ponencia/:idUsuario', ponenciaController.obtener)
router.get('/obtener-ponencias', ponenciaController.obtenerTodas)

module.exports = router