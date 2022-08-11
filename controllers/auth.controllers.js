const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarToken} = require('../helpers/jwt');
const {googleVerificar} = require('../helpers/verificar-tokenGoogle');


const loginAuth = async(req = request, res = request) => {

    const {email, password} = req.body;

    try{

        const usuario = await Usuario.findOne({email});
        //Validar que el usuario exista
        if(!usuario) {
            return res.status(400).json({
                message: 'El email / usuario no existe o no esta registrado - email'
            })
        }
        //Validar el estado del usuario
        if(!usuario.estado) {
            return res.status(400).json({
                message: 'El email / usuario no existe o no esta registrado - estado = false'
            })
        }

        //Validar la contraseña
        const pass = bcryptjs.compareSync(password, usuario.password);

        if(!pass){
            return res.status(400).json({
                message: 'El password / usuario no existe o no esta registrado -password'
            })
        }

        //generar token
        const token = await generarToken(usuario.id);


        res.json({
            message: 'Login successful Auth',
            token
        });
    }catch(err){
        return res.status(500).json({
            message: 'Por favor contacte con el administrator'
        })
    }
   

}

const loginGoogle = async (req, res) => {


    
    try{
    
         res.status(200).json({
            message: 'Entrada con exito google',
            usuario: req.user
         });

    }catch(err){
        res.status(401).json({
            mesage: 'Error en vaidacion de token goolge'
        })
    }

}


module.exports = {
    loginAuth
    ,loginGoogle
}