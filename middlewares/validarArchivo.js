


const validarArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            message: 'El archivo no se pudo subir'
        });
    }

    next();
}

module.exports = {
    validarArchivo
}