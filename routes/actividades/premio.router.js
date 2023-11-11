var express = require("express")
var router = express.Router()
const premioController = require("../../controllers/actividades/premio.controller")

router.post("/create-premio",premioController.create)

module.exports = router