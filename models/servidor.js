const cors = require('cors');
const express = require('express');
const routeUsuario = require('../routes/usuarios.routes')
const {conectionDB} = require('../databases/config');

class Servidor {
    constructor(){

        this.app = express();

        this.DBconection();

        this.pathUsuarios = '/api/usuarios';

        this.middleware();

        this.routes();

      



    }

    middleware(){

        this.app.use(cors());

        this.app.use(express.json());

        // Directorio Público
        this.app.use( express.static('public') );


    }

    async DBconection(){
        await conectionDB();
    }

    routes(){
        this.app.use(this.pathUsuarios, routeUsuario);
    }

    listen(){
        this.app.listen(7000, () => {
            console.log("Servidor corriendo en el puerto 7000");
        })
    }
}

module.exports = Servidor;