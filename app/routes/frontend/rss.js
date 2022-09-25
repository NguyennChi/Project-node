var express = require('express');
var router = express.Router();

let Parser = require('rss-parser');
let parser = new Parser();

const {col_articles,col_menu} = require(__path_configs + 'database');
const articlesModel 		= require(__path_schemas + col_articles);
const Model 		= require(__path_models + 'articles');
const menuModel 		= require(__path_schemas + col_menu);
const folderView	 = __path_view_news + 'pages/rss/';
const layout	     = __path_view_news+ 'frontend';

/* GET home page. */
router.get('/',async (req, res, next) => {
  let itemsSpecial 	= [];
  let feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
  await Model.listItemsFrontend(null, {task: 'items-special'} ).then( (items) => { itemsSpecial = items; });
  await Model.listItemsFrontend(null, {task: 'items-news'} ).then( (items) => { itemsNews = items; });
  const listArticles = await articlesModel.find({}).limit(4);
  const listMenu = await menuModel.find({status:'active'}).sort({ordering: 'desc'});
  res.render(`${folderView}index`, { 
    layout,
    listArticles,
    listMenu,
    itemsSpecial,
    itemsNews,
    feed,
    top_post:true
  });
});


module.exports = router;
