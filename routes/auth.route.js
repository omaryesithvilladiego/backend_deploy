var express = require('express');
var router = express.Router();
const authController = require("../controllers/seguridad/Authentication.controller")

router.post("/create-auth", authController.create)
router.post("/reenviar-code", authController.reenviarCode)
router.post('/confirmar-code', authController.confirmCode)
router.post('/autenticar-semillero', authController.updateNumeroSemilleros)

module.exports = router