var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuario.controller")

router.post("/create-user", usuarioController.create)
router.post("/usuario-login", usuarioController.login)
router.get("/usuarios-activos", usuarioController.usuariosDisponibleles)

module.exports = router