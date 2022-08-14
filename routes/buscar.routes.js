const {Router} = require('express');
const {buscar} = require('../controllers/buscar.controllers');


const router = new Router();


router.get('/:coleccion/:termino', buscar);





module.exports = router;