var express = require("express")
var router = express.Router()
const proyectoController = require("../../controllers/actividades/proyecto.controller")

router.post("/create-proyecto",proyectoController.create)

module.exports = router