const path = require('path');
const {v4: uuidv4} = require('uuid');

extensionesValidas = ['jpg', 'png', 'gif', 'PNG', 'JPEG', 'JPG'];


const subirArchivos = (files, carpeta = '' ) =>{

    return new Promise((resolve, reject) =>{
        const {archivo} = files;

        const nombre = archivo.name.split('.');
    
        const extension = nombre[nombre.length - 1];

    
    
        if (!extensionesValidas.includes(extension)) {
           return reject('La extension no es valida');
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
    
    
        uploadPath = path.join(__dirname, '../uploads',carpeta, nombreTemp);
    
        archivo.mv(uploadPath, function (err){
            if (err) {
                return reject(err);
            }
    
           resolve(nombreTemp);
    
        });
    
    });

}

module.exports = {
    subirArchivos
}