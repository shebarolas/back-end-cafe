require('dotenv').config();

const Servidor = require('./models/servidor');

const server = new Servidor();


server.listen();