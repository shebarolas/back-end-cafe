const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {loginAuth} = require('../controllers/auth.controllers');


const router = new Router();

router.post('/login',[
    check('email', 'El email ingresado no tiene formato valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,loginAuth);


module.exports = router;

