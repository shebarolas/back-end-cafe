const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {upload, actualizarImageCloud,mostrarImagen} = require('../controllers/upload.controller');
const {existsCollection} = require('../helpers/validation-db');
const {validarArchivo} = require('../middlewares/validarArchivo');


const router = new Router();

router.post('/upload', validarArchivo,upload);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'Debe ser un Id valido').isMongoId(),
    check('coleccion').custom(existsCollection),
    validarCampos
], actualizarImageCloud );

router.get( '/:coleccion/:id', [
    check('id', 'Debe ser un Id valido').isMongoId(),
    check('coleccion').custom(existsCollection),
    validarCampos
], mostrarImagen);



module.exports = router;