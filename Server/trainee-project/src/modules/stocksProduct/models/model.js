'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StocksproductSchema = new Schema({
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    date: {
        type: String
    },
    count: {
        type: String
    },
    status: {
        type: String
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
StocksproductSchema.pre('save', function(next){
    let Stocksproduct = this;
    const model = mongoose.model("Stocksproduct", StocksproductSchema);
    if (Stocksproduct.isNew) {
        // create
        next();
    }else{
        // update
        Stocksproduct.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Stocksproduct", StocksproductSchema);