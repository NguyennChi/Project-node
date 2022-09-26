var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/articles', require('./articles'));
module.exports = router;
