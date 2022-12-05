var express = require('express');
var router = express.Router();

router.use('/dashboard', require('./dashboard'));
router.use('/sliders', require('./sliders'));
router.use('/users', require('./users'));
router.use('/group', require('./group'));
router.use('/category', require('./category'));
router.use('/article', require('./article'));
router.use('/menu', require('./menu'));
router.use('/setting', require('./setting'));
module.exports = router;
