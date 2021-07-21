'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PettychashsSchema = new Schema({
    documentNo: {
        type: Number,
    },
    list: {
        type: String,
    },
    admit: {
        type: Number,
    },
    pay: {
        type: Number,

    },
    placeOfUse: {
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
PettychashsSchema.pre('save', function (next) {
    let Pettychashs = this;
    const model = mongoose.model("Pettychashs", PettychashsSchema);
    if (Pettychashs.isNew) {
        // create
        next();
    } else {
        // update
        Pettychashs.updated = new Date();
        next();
    }


})
mongoose.model("Pettychashs", PettychashsSchema);