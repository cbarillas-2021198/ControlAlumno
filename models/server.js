//Configuración del Servidor
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        //Variables de Configuración
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuario: '/api/usuarios',
            curso: '/api/cursos',
            asignacionCurso: '/api/asignaciones'
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas del Control Academico
        this.routes();

    }

    //Coneccion a MongoDB
    async conectarDB() {
        await dbConection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json());

        //Directorio Público del Proyecto
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));
        this.app.use(this.paths.curso, require('../routes/curso'));
        this.app.use(this.paths.asignacionCurso, require('../routes/asignacionAlumnos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo  en puerto ${this.port}`);
        })
    }

}


module.exports = Server;