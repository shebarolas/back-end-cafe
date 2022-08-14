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


const obtenerProductos = async (req, res) => {

    const {limite = 5, desde = 0} = req.query;

    const query = {estado : true};

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).skip(Number(desde)).limit(Number(limite)).populate('usuario')
    ]);



    if(!total || !producto) {
        return res.status(404).json({
            message: 'Producto not found'
        });    
    }

    res.status(200).json({
        message: 'Todos los productos',
        total,
        producto
    });

};

const obtenerProductosId = async (req, res) => {

    const {id} = req.params;

    const producto = await Producto.findById(id).populate('categoria');

    if (!producto) {
        return res.status(404).json({
            message: 'Categorias not found'
        })
    }

    res.status(200).json({
        message: 'Categoria por id',
        producto
    })

}

const actualizarProductoId = async(req, res) => {

    const {id} = req.params;
    
    const {__v, estado, usuario, ...producto} = req.body;

    const productoUpdate = await Producto.findByIdAndUpdate(id, producto);

    if (!productoUpdate){
        return res.status(400).json({message : 'Hubo un problema al actualizar la categoria'});
    }

    res.status(200).json({
        message : 'Categoria actualizada',
        productoUpdate
    });


}


const eliminarProducto = async (req, res) => {

    const {id} = req.params;
    const query = {estado : false};

    const producto = await Producto.findByIdAndUpdate(id, query);

    if (!producto) {
        return res.status(400).json({message : 'Erro al eliminar la categoria'}); 
    }

    res.status(200).json({
        message : 'Categoria eliminada',
        producto
    });

}


module.exports = {
    crearProducto,
    actualizarProductoId,
    eliminarProducto,
    obtenerProductos,
    obtenerProductosId
}
