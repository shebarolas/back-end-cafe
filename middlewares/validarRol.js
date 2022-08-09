const { request, response } = require("express");


const adminRol = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(401).json({
            message: 'No se puede eliminar usuario sin estar autenticado'
        });
    }

    const {nombre, role} = req.usuario;

    if(role !== 'admin'){
        return res.status(401).json({
            message: `El usuario ${nombre} no esta autorizado para realizar esta accion`
        });
    }

    next();

}


module.exports = {
    adminRol
}