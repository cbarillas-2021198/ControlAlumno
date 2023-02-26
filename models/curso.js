const {Schema, model} = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String
    }
});

module.exports = model('Curso', CursoSchema);