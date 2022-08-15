const {request, response} = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');


const upload = (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            message: 'El archivo no se pudo subir'
        });
    }

    const {archivo} = req.files;

    const nombre = archivo.name.split('.');

    const extension = nombre[nombre.length - 1];

    const extensionesValidas = ['jpg', 'png', 'gif'];

    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            message: 'La extension del archivo no es valida'
        });
    }

    const nombreTemp = uuidv4() + '.' + extension;


    uploadPath = path.join(__dirname, '../uploads', nombreTemp);

    archivo.mv(uploadPath, function (err){
        if (err) {
            return res.status(500).json({message: err});
        }

        res.status(200).json({
            message: 'Archivo subido' + uploadPath,
            archivo
        })

    });

}


module.exports = {
    upload
}


