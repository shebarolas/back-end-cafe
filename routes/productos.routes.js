const {Router} = require('express');
const {check} = require('express-validator');
const {crearProducto, actualizarProductoId,eliminarProducto,obtenerProductos,obtenerProductosId} = require('../controllers/producto.controllers');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJwt} = require('../middlewares/validarJWT');
const { adminRol } = require('../middlewares/validarRol');
const {idExtistsProduct} = require('../helpers/validation-db');

const router = new Router();

router.get('/obtener-producto', obtenerProductos);

router.get('/obtener-producto/:id', [
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(idExtistsProduct),
    validarCampos
],obtenerProductosId)

router.post('/crear-producto',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id categoria debe ser valido').isMongoId(),
    validarCampos
], crearProducto);

router.put('/actualizar-producto/:id', [
    validarJwt,
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(idExtistsProduct),
    validarCampos
], actualizarProductoId);

router.delete('/eliminar-producto/:id', [
    validarJwt,
    adminRol,
    check('id', 'El id es obligatorio').isMongoId(),
    check('id').custom(idExtistsProduct),
    validarCampos
], eliminarProducto);


module.exports = router;
