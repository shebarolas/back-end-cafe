const {request, response} = require('express');

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');



const crearUsuario = async(req = request, res = response) => {

    const {nombre, email, password, role} = req.body;

    const usuario = new Usuario({
        nombre,
        email,
        password,
        role
    });

    const emailExsite = await Usuario.findOne({email: email});

    if (emailExsite) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    const salt = bcrypt.genSaltSync();
    //Encriptar la password
    usuario.password = bcrypt.hashSync(password, salt);
    //Guardar en la base de datos
    await usuario.save();

    res.json({
        message: 'Usuario metodo post',
        usuario
    });


}

const get = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    // const usuarios = await Usuario.find().skip(Number(desde)).limit(Number(limite));

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);
   

    if(!usuarios){
        return res.status(400).json({
            message: 'User not found in database'
        });
    }
    
    res.json({
        message: 'Usuario get ',
        total,
        usuarios
    });

}

const actualizarUsuarios = async (req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, role, ...usuario} = req.body

    if(password){
        const salt = bcrypt.genSaltSync();
        //Encriptar la password
        usuario.password = bcrypt.hashSync(password, salt);
    }

    const usuarios = await Usuario.findByIdAndUpdate(id, usuario);

    res.json({
        message: 'Usuario Update',
        usuarios
    });


}

const eliminarUsuario = async (req = request, res = response) => {

    const {id} = req.params
    const query = {estado: false};

    const uid = req.uid;

    console.log(uid)

    const usuario = await Usuario.findByIdAndUpdate(id, query);

    const usuario1 = await Usuario.findById(uid);

 

    res.status(200).json({
        message: 'Usuario Update Success',
        usuario,
        usuario1
    })

}


module.exports = {
    crearUsuario,
    get,
    actualizarUsuarios,
    eliminarUsuario,
}