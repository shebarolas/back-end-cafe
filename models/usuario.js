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
        required : true
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
    const {__v , password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSche);