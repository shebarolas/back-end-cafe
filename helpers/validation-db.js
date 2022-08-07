const Role = require('../models/role');
const Usuario = require('../models/usuario');


const roleExists = async(role = '') => {
    console.log(role);
    const existRole = await Role.findOne({rol : role});
    
    console.log(existRole);
    const roles = await Role.find();
    console.log(roles);


    if(!existRole){
        throw new Error(`${role} is not a role`);
    }

}

const emailExists = async(email = '') => {

    const existEmail = await Usuario.findOne({ email });

    if(existEmail){
        throw new Error("El email ya esta registrado")
    }

}

const idExtists = async(id) => {
    
    const existId = await Usuario.findById(id);

    if(!existId){
        throw new Error("El id no esta registrado en la base de datos")
    }
}

module.exports = {
    roleExists,
    emailExists,
    idExtists
}