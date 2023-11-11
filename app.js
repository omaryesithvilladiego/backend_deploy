var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoConnect = require('./config/database')
const moongose = require("mongoose")
const productoRouter = require("./routes/producto.route")
const productoSecond = require("./routes/producto.route.second")
const usuarioRoute = require("./routes/usuario.route")
const estudianteRoute = require('./routes/estudiante/estudiante.route')
const proyectoRoute = require("./routes/actividades/proyecto.router")
const premioRoute = require("./routes/actividades/premio.router")
const cursoRoute = require("./routes/actividades/curso.router")
const ponenciaRouter = require("./routes/actividades/ponencia.router")
const cors = require("cors");
require("dotenv").config();
const auth = require('./auth/main_auth')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(`${__dirname}/storage`))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/usuarios', usuarioRoute)
app.use('/estudiante', estudianteRoute)

//Database conection settings
moongose.set('strictQuery', false);

mongoConnect.mongoConnect()


const server = app.listen(process.env.API_PORT,() =>{
  console.log('API escuchando en el puerto ' + process.env.API_PORT)

})




app.use("/producto", productoRouter)
app.use("/producto-second", productoSecond)
app.use('/proyecto', proyectoRoute)
app.use('/curso', cursoRoute)
app.use('/premio', premioRoute)
app.use('/ponencia' , auth, ponenciaRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
