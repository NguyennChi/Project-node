const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    slug: String, 
    status: String,
    // avatar: String,
    ordering: Number,
    groups_acp: String,
    //     created: {
    //     userId: Number,
    //     username: String,
    //     time: Date
    // },
    // modified: {
    //     userId: Number,
    //     username: String,
    //     time: Date
    // },
    description: String,
},{ timestamps: true 
});

module.exports = mongoose.model(databaseConfig.col_groups, schema );