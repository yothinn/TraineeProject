'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategoriesSchema = new Schema({
    id: {
        type: String,
        required: 'Please fill a Categories id',
    },
    name: {
        type: String,
        required: 'Please fill a Categories name',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});
CategoriesSchema.pre('save', function(next){
    let Categories = this;
    const model = mongoose.model("Categories", CategoriesSchema);
    if (Categories.isNew) {
        // create
        next();
    }else{
        // update
        Categories.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Categories", CategoriesSchema);