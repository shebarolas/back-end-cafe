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


const obtenerCategorias = async (req, res) => {

    const {limite = 5, desde = 0} = req.query;

    const query = {estado : true};

    const [total, usuario] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(desde)).limit(Number(limite)).populate('usuario')
    ]);



    if(!total || !usuario) {
        return res.status(404).json({
            message: 'Categorias not found'
        });    
    }

    res.status(200).json({
        message: 'Todas las categorias',
        total,
        usuario
    });

};

const obtenerCategoriasId = async (req, res) => {

    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario');

    if (!categoria){
        return res.status(404).json({
            message: 'Categorias not found'
        })
    }

    res.status(200).json({
        message: 'Categoria por id',
        categoria
    })

}

const actualizarCategoriaId = async(req, res) => {

    const {id} = req.params;
    
    const {__v, estado, usuario, ...categoria} = req.body;

    const categoriaUpdate = await Categoria.findByIdAndUpdate(id, categoria);

    if (!categoriaUpdate){
        return res.status(400).json({message : 'Hubo un problema al actualizar la categoria'});
    }

    res.status(200).json({
        message : 'Categoria actualizada',
        categoriaUpdate
    });


}


const eliminarCategoria = async (req, res) => {

    const {id} = req.params;
    const query = {estado : false};

    const categoria = await Categoria.findByIdAndUpdate(id, query);

    if (!categoria) {
        return res.status(400).json({message : 'Erro al eliminar la categoria'}); 
    }

    res.status(200).json({
        message : 'Categoria eliminada',
        categoria
    });

}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasId,
    actualizarCategoriaId,
    eliminarCategoria
}