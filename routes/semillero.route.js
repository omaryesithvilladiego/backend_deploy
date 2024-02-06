var express = require('express');
var router = express.Router();
const semilleroController = require('../controllers/semillero.controller')


router.post('/guardar-semillero', semilleroController.create)


module.exports = router