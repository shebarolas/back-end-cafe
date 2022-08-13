const {Router} = require('express');
const {check} = require('express-validator');
const {crearProducto} = require('../controllers/producto.controllers');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJwt} = require('../middlewares/validarJWT');
const { adminRol } = require('../middlewares/validarRol');
const router = new Router();

router.post('/crear-producto',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El id categoria debe ser valido').isMongoId(),
    validarCampos
], crearProducto);




module.exports = router;
