const { response, request } = require('express');
const Asignacion = require('../models/asignacionAlumnos');

const getAsignacion = async (req = request, res = response) => {
    const { params } = req.params;
    const listaDeAsignaciones = await Promise.all([
        Asignacion.countDocuments(params),
        Asignacion.find(params)
            .populate('curso', 'nombre')
            .populate('usuario', 'nombre')
    ]);

    const listaNombres = listaDeAsignaciones[1].map(asignacion => ({
        usuario: asignacion.usuario.nombre,
        curso: asignacion.curso.nombre
    }));

    res.json({
        msg: 'Cursos Asignados:',
        listaDeAsignaciones: listaNombres
    })
}

const postAsignacion = async (req = request, res = response) => {
    const { curso, usuario } = req.body;

    const totalAsignaciones = await Promise.all([
        Asignacion.countDocuments(usuario),
    ]);
    if (totalAsignaciones == 3) {
        res.status(201).json({
            msg: 'Alcanzaste el limite de cursos (3)'
        });
    } else {
        const data = {
            curso,
            usuario
        }

        const asignacionExistente = await Asignacion.findOne({ curso, usuario });
        if (asignacionExistente) {
            return res.status(400).json({ msg: 'Ya te encuentras asignado a este curso' });
        }

        const asignacion = new Asignacion(data);
        await asignacion.save();

        res.status(201).json({
            msg: 'Se asigno correctamente',
            totalAsignaciones,
            asignacion
        })

    }
}

module.exports = {
    getAsignacion,
    postAsignacion,

}