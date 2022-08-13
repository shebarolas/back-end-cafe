const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriasId, actualizarCategoriaId, eliminarCategoria } = require('../controllers/categoria.controllers');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJwt} = require('../middlewares/validarJWT');
const { adminRol } = require('../middlewares/validarRol');
const {idExtistsCateg} = require('../helpers/validation-db');


const router = new Router();

//Obtener todas las categorias
router.get('/get-categoria', obtenerCategorias);

//Obtener todas las por id 
router.get('/get-categoria/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idExtistsCateg),
    validarCampos
], obtenerCategoriasId);
//Crear categoria, solo usuario con token valido
router.post('/crear-categoria',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar las categorias - token valido
router.put('/actualizar-categoria/:id', [
    validarJwt,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idExtistsCateg),
    validarCampos
], actualizarCategoriaId);

//Borrar las categorias - admin
router.delete('/borrar-categoria/:id', [
    validarJwt,
    adminRol,
    check('id', 'EL id no es valido').isMongoId(),
    check('id').custom(idExtistsCateg),
    validarCampos
], eliminarCategoria);

module.exports = router;