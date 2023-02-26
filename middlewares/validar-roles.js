const { request, response  } = require('express');

const esMaestroRole = ( req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admin puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { rol, nombre  } = req.usuario
    if ( rol !== 'ROL_MAESTRO') {
        return res.status(401).json({
            msg: `${ nombre } Los alumnos no tinene acceso a esta acción`
        });
    }

    next();

}

module.exports = {
    esMaestroRole
}