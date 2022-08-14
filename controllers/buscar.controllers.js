const {request, response} = require('express');
const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const coleccionesDB = [
    'usuario',
    'producto',
    'categoria'
];


const buscarUsuarios = async (termino = '',  res = response) => {

    const mongoId = ObjectId.isValid(termino);

    if(mongoId){
        const usuarios = await Usuario.findById(termino);

        res.json({
            results: (usuarios) ? [usuarios] : []
        }); 
    }else{

        const regex = new RegExp(termino, 'i');
        const usuarios = await Usuario.find({
            $or: [{nombre: regex}, {email: regex}],
            $and: [{estado : true}]
        });

        res.json({
            results: usuarios
        })
    }

}

const buscarCategorias = async (termino = '', res = response) => {

    const mongoId = ObjectId.isValid(termino);

    if (mongoId) {

        const categoria = await Categoria.findById(termino);

        res.json({
            results: (categoria)? [categoria]: []
        })

    }else{
        const regex = new RegExp(termino, 'i');

        const categoria = await Categoria.find({
            nombre: regex,
            estado: true
        });

        res.json({
            results: categoria
        });
    }

}


const buscarProduct = async(termino = '', res = response )=> {

    const mongoId = ObjectId.isValid(termino);

    if(mongoId){
        const producto = await Producto.findById(termino);

        res.json({
            results: (producto) ? [producto] : []
        }); 
    }else{

        const regex = new RegExp(termino, 'i');
        const producto = await Producto.find({
            $or: [{nombre: regex}],
            $and: [{estado : true}]
        });

        res.json({
            results: producto
        })
    }


}


const buscar = async (req, res) => {

    const {coleccion, termino} = req.params;

    if (!coleccionesDB.includes(coleccion)) {
        return res.status(500).json({message: 'No existe es coleccion en la base de datos'});
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res);
            break;
        
        case 'producto':
            buscarProduct(termino, res);
            break;

        case 'categoria':
            buscarCategorias(termino, res);
            break;

        default:
            break;
    }

}


module.exports = {
    buscar
}