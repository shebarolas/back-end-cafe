const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria } = require('../controllers/categoria.controllers');
const {validarCampos} = require('../middlewares/validarCampos');
const {validarJwt} = require('../middlewares/validarJWT');


const router = new Router();

//Obtener todas las categorias
router.get('/get-categoria', (req, res) => {
    res.json({
        message: 'Todas las categorias'
    })
});

//Obtener todas las por id 
router.get('/get-categoria/:id', (req, res) => {
    res.json({
        message: 'Todas las categorias por Id'
    })
});
//Crear categoria, solo usuario con token valido
router.post('/crear-categoria',[
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar las categorias - token valido
router.put('/actualizar-categoria/:id', (req, res) => {
    res.json({
        message: 'Actualizar las categorias por id'
    });
});

//Borrar las categorias - admin
router.delete('/borrar-categoria/:id', (req, res) => {
    res.json({
        message: 'Borrar categoria por id'
    });
});

module.exports = router;