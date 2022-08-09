const jwt = require('jsonwebtoken');
const {request, response} = require('express');
const Usuario = require('../models/usuario');

const validarJwt = async(req = request, res = response, next) => {

    const token = req.header('token-x');

    if(!token) {
        res.status(401).json({
            message: 'No se a enviado ningun token'
        });
    }

    try{

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVETEKEY);

        req.uid = uid;

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            res.status(401).json({
                message: 'Usuario autenticado no existe en la base de datos'
            })
        }

        if(!usuario.estado){
            res.status(401).json({
                message: 'Usuario autenticado esta en estado = false'
            })
        }
      
        console.log(req.uid);
        req.usuario = usuario;
    
    
        next();
    }catch(err){

        console.log(err)
        res.status(401).json({
            message: 'El token no es valido'
        });
    }

   

}

module.exports = {
    validarJwt
}

