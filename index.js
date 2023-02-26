require('dotenv').config();

// Importación de la configuración del servidor(server)
const Server = require('./models/server');

const servidorIniciado = new Server();

servidorIniciado.listen();