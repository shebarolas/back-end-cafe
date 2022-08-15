const {Router} = require('express');

const {upload} = require('../controllers/upload.controller');


const router = new Router();

router.post('/upload', upload);



module.exports = router;