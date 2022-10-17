const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    slug: String, 
    status: String,
    avatar: String,
    ordering: Number,
    avatar: String
});

module.exports = mongoose.model(databaseConfig.col_users, schema );