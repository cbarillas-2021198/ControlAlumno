const {Schema, model} = require('mongoose');

const AsignacionSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },

   
})

module.exports = model('Asignacion', AsignacionSchema);