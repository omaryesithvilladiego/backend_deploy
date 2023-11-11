var express = require("express")
var router = express.Router()
const cursoController = require("../../controllers/actividades/curso.controller")

router.post("/create-curso",cursoController.create)

module.exports = router