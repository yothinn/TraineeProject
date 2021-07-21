'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductsSchema = new Schema({
    productId: {
        type: String,
    },
    productName: {
        type: String,
    },
    category: {
        type: String,
    },
    type: {
        type: String,
    },
    price: {
        type: Number,
    },
    count: {
        type: Number,
    },
    description: {
        type: String,
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