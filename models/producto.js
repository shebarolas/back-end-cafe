const {Schema, model} = require('mongoose');


const ProductoSche = Schema({

    nombre:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        required: true,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default:0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {
        type: String
    },
    disponibilidad: {
        type: Boolean,
        default: true
    }

});

// ProductoSche.methods.toJSON = function (){


// }


module.exports = model('Producto', ProductoSche);