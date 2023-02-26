//Importación
const { response, request } = require('express');

//Modelos
const Curso = require('../models/curso');
const Asignacion = require('../models/asignacionAlumnos');



const getCursos = async (req = request, res = response) => {

    const listaCursos = await Promise.all([
        Curso.countDocuments(),
        Curso.find()
    ]);

    res.json({
        msg: 'Cursos:',
        listaCursos
    })

}

const postCurso = async (req = request, res = response) => {

    const { nombre, descripcion } = req.body;
    const cursoDB = new Curso({ nombre, descripcion });

    await cursoDB.save();

    res.status(201).json({
        msg: 'Curso creado correctamente',
        cursoDB
    });

}

const putCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const cursoAnterior = await Curso.findById(id);
    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

    const asignacionesAnteriores = await Asignacion.find({ curso: cursoAnterior._id });
    if (asignacionesAnteriores.length > 0) {
        await Promise.all(asignacionesAnteriores.map(async (asignacion) => {
            asignacion.curso = cursoEditado._id;
            await asignacion.save();
        }));
    }
    res.json({
        msg: 'Curso editado correctamente',
        cursoEditado
    });

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const asignaciones = await Asignacion.find({ curso: id });
    await Promise.all(
        asignaciones.map(async (asignacion) => {
            await asignacion.remove();
        })
    );

    const cursoEliminado = await Curso.findByIdAndRemove(id);


    res.json({
        msg: 'Curso eliminado correctamente',
        cursoEliminado
    });

}

module.exports = {
    getCursos,
    postCurso,
    putCurso,
    deleteCurso
}