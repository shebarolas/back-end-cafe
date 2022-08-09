const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const validarJwt = (req = request, res = response, next) => {

    const token = req.header('token-x');

    if(!token) {
        res.status(401).json({
            message: 'No se a enviado ningun token'
        });
    }

    try{

     

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVETEKEY);

        req.uid = uid;
    
    
        next();
    }catch(err){

        console.log(err)
        res.status(401).json({
            message: 'El token no es valido'
        });
    }

   

}

module.exports = {
    validarJwt
}

