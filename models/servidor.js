const cors = require('cors');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const routeUsuario = require('../routes/usuarios.routes')
const routeAuth = require('../routes/auth.routes');
const routeCategory = require('../routes/categorias.routes');
const routeProduct = require('../routes/productos.routes');
const {conectionDB} = require('../databases/config');


class Servidor {
    constructor(){

        this.app = express();

        this.DBconection();

        this.pathUsuarios = '/api/usuarios';

        this.pathAuth = '/auth/usuarios';

        this.pathCategorias = '/categorias';

        this.pathProductos = '/api/productos'

        this.middleware();

        this.routes();


      



    }

    middleware(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(session({secret : 'zorro'}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        // Directorio Público
        this.app.use( express.static('public') );




    }

    async DBconection(){
        await conectionDB();
    }

    routes(){
        this.app.use(this.pathUsuarios, routeUsuario);
        this.app.use(this.pathAuth, routeAuth);
        this.app.use(this.pathCategorias, routeCategory);
        this.app.use(this.pathProductos, routeProduct);
    }

    listen(){
        this.app.listen(process.env.PORT || 7000, () => {
            console.log("Servidor corriendo en el puerto 7000");
        })
    }
}

module.exports = Servidor;