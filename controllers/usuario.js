//Importación
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {


    const query = { estado: true };
    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'Usuarios:',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = respones) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);
    await usuarioDB.save();

    res.status(200).json({
        msg: 'Usuario creado correctamente!',
        usuarioDB
    });

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Usuario editado correctamente',
        usuarioEditado
    });

}

const deleteUsuario = async (req = request, res = response) => {

    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Usuario eliminado correctamente',
        usuarioEliminado
    });

}


module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}