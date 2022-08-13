const {request, response} = require('express');

const Producto= require('../models/producto');


const crearProducto = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const {categoria, precio} = req.body;
    const productoDB = await Producto.findOne({
        nombre
    }).populate('categoria');

    if (productoDB){
        return res.status(400).json({
            mesage: 'El producto ya existe'
        });
    }else{
        const uid = req.uid

        const producto = new Producto({
            nombre,
            usuario: uid,
            categoria,
            precio
        });

        const data =await (await (await producto.save()).populate('categoria')).populate('usuario');

        res.status(200).json({
            mesage: 'Producto creada con exito',
            data
        });
        
    }  

};


const obtenerCategorias = async (req, res) => {

    const {limite = 5, desde = 0} = req.query;

    const query = {estado : true};

    const [total, categoria] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(Number(desde)).limit(Number(limite)).populate('usuario')
    ]);



    if(!total || !usuario) {
        return res.status(404).json({
            message: 'Categorias not found'
        });    
    }

    res.status(200).json({
        message: 'Todas las categorias',
        total,
        categoria
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
    crearProducto
}
