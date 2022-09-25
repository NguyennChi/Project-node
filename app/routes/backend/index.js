var express = require('express');
var router = express.Router();

router.use('/', require('./dashboard'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/sliders', require('./sliders'));
router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));
router.use('/menu', require('./menu'));

module.exports = router;
