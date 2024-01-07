var express = require('express');
var router = express.Router();
const usuarioController = require("../controllers/usuario.controller")

router.post("/create-user", usuarioController.create)
router.post("/usuario-login", usuarioController.login)
router.get("/usuarios-activos", usuarioController.usuariosDisponibleles)
router.post("/create-user-root", usuarioController.createuserRoot)
router.post("/change-password/:idUsuario/:newPassword", usuarioController.changePass)
router.post("/recovery-password", usuarioController.passwordRecovery)

module.exports = router