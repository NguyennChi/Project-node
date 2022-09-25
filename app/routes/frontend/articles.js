var express = require("express");
var router = express.Router();
const ParamsHelpers = require(__path_helpers + "params");
const { col_articles, col_categories } = require(__path_configs + "database");
const articlesModel = require(__path_schemas + col_articles);
const Model = require(__path_models + "articles");
const categoryModel = require(__path_schemas + col_categories);
const folderView = __path_view_news + "pages/article/";
const layout = __path_view_news + "frontend";
/* GET home page. */
router.get("/:id", async (req, res, next) => {
  let idArticle = ParamsHelpers.getParam(req.params, 'id', '');
  let itemArticle = {};
  await Model.getItemFrontend(idArticle, null).then((item) => {
    itemArticle = item;
  });

  await Model.listItemsFrontend(null, { task: "items-news" }).then((items) => {
    itemsNews = items;
  });
  const listArticles = await articlesModel.find({}).limit(4);
  const listCategory = await categoryModel.find({}).sort({ ordering: "desc" });
  res.render(`${folderView}index`, {
    layout,
    listArticles,
    listCategory,
    itemsNews,
    itemArticle,
    top_post: false,
  });
});

module.exports = router;
