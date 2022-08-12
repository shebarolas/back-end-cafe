const {request, response} = require('express');

const Categoria = require('../models/categoria');


const crearCategoria = async (req = request, res = response) => {


    const nombre = req.body.nombre.toUpperCase();


    const categoriaDB = await Categoria.findOne({
        nombre
    });

    if (categoriaDB){
        return res.status(400).json({
            mesage: 'La categoria ya existe'
        });
    }else{
        const uid = req.uid

        const categoria = new Categoria({
            nombre,
            usuario: uid
        });

        const data = await categoria.save();

        res.status(200).json({
            mesage: 'Categoria creada con exito',
            data
        });
        
    }  

};


module.exports = {
    crearCategoria
}