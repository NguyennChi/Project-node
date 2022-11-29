var express = require('express');
var router = express.Router();
const routerName = "dashboard"
const pageTitle = `Dashboard Management`
const folderView = __path_views_backend + `/pages/${routerName}/`;
const layout = __path_views_backend + 'backend';


router.get('/', function(req, res, next) {
  res.render(`${folderView}index`, {
  });
});

module.exports = router;
