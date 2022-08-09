const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarToken} = require('../helpers/jwt');


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


module.exports = {
    loginAuth
}