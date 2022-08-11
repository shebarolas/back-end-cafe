const {Schema, model} = require('mongoose');


const UsuarioSche = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required : true,
        default: 'admin'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSche.methods.toJSON = function () {
    const {__v , password, _id, ...usuario} = this.toObject();

    usuario.uid = _id;

    return usuario;
}


module.exports = model('Usuario', UsuarioSche);