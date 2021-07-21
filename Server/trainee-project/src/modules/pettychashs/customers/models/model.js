'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomersSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Customers name',
    },
    lastName: {
        type: String,
        required: 'Please fill a Customers lastName',
    },
    amount: {
        type: Number,
        required: 'Please fill a Customers amount',
    },
    limit: {
        type: Number,
        required: 'Please fill a Customers limit',
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
CustomersSchema.pre('save', function(next){
    let Customers = this;
    const model = mongoose.model("Customers", CustomersSchema);
    if (Customers.isNew) {
        // create
        next();
    }else{
        // update
        Customers.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Customers", CustomersSchema);