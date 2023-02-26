const Usuario = require('../models/usuario');
const Curso = require('../models/curso');


const emailExiste = async (correo = '') => {

    const existeEmailDeUsuario = await Usuario.findOne({ correo });
    if (existeEmailDeUsuario) {
        throw new Error(`El correo ${correo}, ya esta registrado en la DB `);
    }
}

const esRoleValido = async (rol = '') => {

    const existeRolDB = await Usuario.findOne({ rol });
    if (!existeRolDB) {
        throw new Error(`El rol ${rol}, no existe en la DB `);
    }
}


const existeUsuarioPorId = async (id) => {

    const existIdOfUser = await Usuario.findById(id);
    if (!existIdOfUser) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}


const existeCurso = async (nombre = '') => {

    const existeCurso = await Curso.findOne({ nombre });
    if (existeCurso) {
        throw new Error(`El curso ${nombre}, ya esta registrado en la DB `);
    }
}

const existeCursoPorId = async (id) => {

    const existIdOfCourse = await Curso.findById(id);
    if (!existIdOfCourse) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    existeCurso,
    existeCursoPorId
}