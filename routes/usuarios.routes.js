const {Router} = require('express');
const {check} = require('express-validator');
const {crearUsuario, get, actualizarUsuarios, eliminarUsuario} = require('../controllers/usuarios.controllers');
const {validarCampos} = require('../middlewares/validarCampos');
const {roleExists, emailExists, idExtists} = require('../helpers/validation-db');

const router = Router();
//Obtener todos los usuarios
router.get('/get', get);

router.post('/crear-usuario',
[check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('email', 'El email no es valido').isEmail(),
check('email').custom(emailExists),
// check('role', 'El role no es valido').isIn(['admin','normal']),
check('role').custom(roleExists),
validarCampos
],crearUsuario);

router.put('/actualizar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExtists),
    validarCampos

], actualizarUsuarios);

router.delete('/eliminar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idExtists),
    validarCampos
], eliminarUsuario);



module.exports = router;