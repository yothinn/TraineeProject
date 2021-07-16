'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductsSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Products name',
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
ProductsSchema.pre('save', function(next){
    let Products = this;
    const model = mongoose.model("Products", ProductsSchema);
    if (Products.isNew) {
        // create
        next();
    }else{
        // update
        Products.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Products", ProductsSchema);