var express = require("express")
var router = express.Router()
const estudianteController = require("../../controllers/estudiante/estudiante.controller")

router.post("/create-estudiante",estudianteController.create)
router.get("/obtener-estudiantes", estudianteController.obtenerEstudiante)
router.delete('/eliminar-estudiante', estudianteController.delete)

module.exports = router