var express = require('express');
var router = express.Router();

router.use('/', require('./dashboard'));
router.use('/sliders', require('./sliders'));

module.exports = router;