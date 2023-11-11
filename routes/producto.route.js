var express = require('express');
var router = express.Router();
const upload = require("../libs/storage")
const productoController = require("../controllers/producto.controller")

router.post('/guardar-producto', upload,productoController.create)

module.exports = router