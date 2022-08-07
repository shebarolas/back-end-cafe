const mongoose = require('mongoose');

const conectionDB = async() => {

    try{

        await mongoose.connect(process.env.MONGO_DB);

        console.log('Conectado en la base de datos');

    }catch(error){
        throw new Error('Error al inicializar la base de datos');
    }

}

module.exports = {
    conectionDB
}