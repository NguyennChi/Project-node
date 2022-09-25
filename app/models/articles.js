const Collection = 'articles';
const Model = require(__path_schemas + Collection);
const FileHelpers = require(__path_helpers + 'file');
const CategoriesModel = require(__path_schemas + 'categories');
module.exports = {
	getList(objWhere, pagination, {sortField, sortType}) {
		let sort = sortField && sortType ? {[sortField]: sortType} : {_id: 'desc'};
		return Model
			.find(objWhere)
			.sort(sort)
			.skip((pagination.currentPage-1) * pagination.totalItemsPerPage)
			.limit(pagination.totalItemsPerPage)
	},
    listItemsFrontend: (params = null, options = null) => {
        let find = {};
        let select = 'name';
        let limit = 5;
        let sort = '';

        if (options.task == 'items-special'){
            find = {status:'active', special: 'topPost'};
            sort = {ordering: 'asc'};
			select = 'title slug categoriesId thumbnail';
           
        }

        if (options.task == 'items-news'){
            select = 'title slug thumbnail categoriesId createdAt';
            find = {status:'active'};
            sort = {'createdAt': 'desc'};   
        }

        if (options.task == 'items-in-category'){
            select = 'name created.user_name created.time category.name thumb content';
            find = {status:'active', 'category.id': params.id};
            sort = {'created.time': 'desc'};   
        }


        if (options.task == 'items-random'){
            return ArticleModel.aggregate([
                    { $match: { status: 'active' }},
                    { $project : {name : 1 , created : 1 ,thumb: 1}  },
                    { $sample: {size: 3}}
                ]); 
        }
        if (options.task == 'items-others'){
            select = 'name created.user_name created.time category.id category.name thumb content';
            find = {status:'active', '_id': {$ne: params._id}, 'category.id': params.category.id};
            sort = {'created.time': 'desc'};   
        }

        return Model.find(find).select(select).limit(limit).sort(sort);
       
    },
	getItemFrontend: (id, options = null) => {
        return Model.findById(id)
            .select('title slug thumbnail categoriesId createdAt description ');
    },		
	countRow(objWhere) {
		return Model.count(objWhere).then(data => data);
	},
	updateOne({id,field,value,...restParams} = {}){
		if(!field) return Model.updateOne({_id: id}, restParams);
		return Model.updateOne({_id: id}, {[field]: value,...restParams});
	},
	updateMany({cid,...restParams},field,value,operator = '$in') {
		return Model.updateMany({_id: {[operator]: cid }}, {[field]: value,...restParams});
	},
	async addOne(obj){
		let article = await Model(obj).save();
		let Category = await CategoriesModel.findById(obj.categoriesId);
		Category.articles.push(article._id,article.title,article.name);
		return Category.save();
	},
	deleteOne(id,field = null){
		if(field) {
			return Model.findById(id).select(field).then(data => {
				FileHelpers.remove(`public/uploads/${Collection}/`, data[field]);
			}).then(() => Model.deleteOne({_id: id}));
		} else {
			return Model.deleteOne({_id: id});
		}
		
	},
	deleteMulti(arrayId){
		return Model.remove({_id: arrayId});
	},
	findById(id) {
		return Model.findById(id);
	}
}