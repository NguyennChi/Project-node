const databaseConfig = require(__path_configs + 'database');
let createFilterStatus =  async (currentStatus,collection) => {
	const Model = require(__path_schemas +  collection);
    let statusFilter = [
		{name: 'All', value: 'all', count: 0, class: 'default'},
		{name: 'Active', value: 'active',  count: 0, class: 'default'},
		{name: 'InActive', value: 'inactive',  count: 0, class: 'default'}
	];

	for(let index = 0; index < statusFilter.length; index++) {
		let item = statusFilter[index];
		let condition = (item.value !== "all") ? {status: item.value} : {};
		if(item.value === currentStatus) statusFilter[index].class = 'success';

		await Model.count(condition).then( (data) => {
			statusFilter[index].count = data;
		});
	}

    return statusFilter;
}

const firstLetterUppercase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const countCollection = async (arrKey, collectionModel) => {
  for (let i = 0; i < arrKey.length; i++) {
		let key = arrKey[i];
		await collectionModel[key].count({}).then( (data) => {
			collectionModel[key] = data;
		});
	}
	return collectionModel;
}
const getCategory = async () => {
	const Model = require(__path_schemas + databaseConfig.col_categories);
	const listCategory = await Model.find({status: 'active'});
	return listCategory;
}

module.exports = {
    createFilterStatus: createFilterStatus,
		firstLetterUppercase,
		countCollection,
		getCategory
}