const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const {loginAuth, loginGoogle} = require('../controllers/auth.controllers');
const passport = require('passport');
require('../middlewares/validarGoogle');


const router = new Router();

router.post('/login',[
    check('email', 'El email ingresado no tiene formato valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
] ,loginAuth);

router.get('/google',
    passport.authenticate('google', { scope: ["profile", "email"]}),
  );

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/usuarios/google/login-success',
  failureRedirect: '/auth/usuarios/google/login-failure'
}));

router.get('/google/login-success', loginGoogle);


module.exports = router;

