const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstudianteSchema = new Schema({
    nombresEstudiante: {
        type: String,
        required: true,
        max: 100 // Puedes ajustar el límite máximo según tus necesidades
    },
    apellidosEstudiante: {
        type: String,
        required: true,
        max: 100 // Puedes ajustar el límite máximo según tus necesidades
    },
    fechaIngresoEstudiante: {
        type: Date,
        
    },
    correoInstitucional: {
        type:String,
        require:true,
        unique:true
    },
    direccionEstudiante: {
        calle: Number,
        numero: Number,
        pais:String,
        ciudad: String,
        codigoPostal: Number,
        barrio:String
    },
    cedulaEstudiante: {
        type: Number,
        required: true,
        unique: true // Asegura unicidad en las cédulas
    },
    celularEstudiante: {
        type: Number,
        required: true
    },
    codigoEstudiante: {
        type: Number,
      
    },
    fechaNacimientoEstudiante: {
        type: Date,
        
    },
    campusEstudiante: {
        type: String,
        
    },
    fechaRetiroEstudiante: {
        type: Date,
        required: false 
    }
});

const Estudiante = mongoose.model("estudiante", EstudianteSchema);

module.exports = Estudiante;
