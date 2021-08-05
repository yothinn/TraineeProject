'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PettycashsSchema = new Schema({
    pettycashsId:{
        type: String
    },
    name: {
        type: String,
        // required: 'Please fill a Attendances name',
    },
    lastName: {
        type: String,
        // required: 'Please fill a Attendances lastName',
    },
    amount: {
        type: Number,
        // required: 'Please fill a Attendances amount',
    },
    limit: {
        type: Number,
        // required: 'Please fill a Attendances limit',
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
PettycashsSchema.pre('save', function(next){
    let Pettycashs = this;
    const model = mongoose.model("Pettycashs", PettycashsSchema);
    if (Pettycashs.isNew) {
        // create
        next();
    }else{
        // update
        Pettycashs.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Pettycashs", PettycashsSchema);