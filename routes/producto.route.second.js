var express = require('express');
var router = express.Router();
const upload = require("../libs/storage")
const productoSecondController = require("../controllers/producto.controller.second")

router.post('/guardar-producto-second', upload,productoSecondController.create)



router.post('/guardar-second-url', upload, productoSecondController.saveImgUrl2)
module.exports = router