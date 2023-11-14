var express = require("express")
var router = express.Router()
const proyectoController = require("../../controllers/actividades/proyecto.controller")
const upload = require('../../libs/storageProyecto')

router.post("/create-proyecto", upload, proyectoController.create)

module.exports = router