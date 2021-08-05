'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TablelistSchema = new Schema({
    pettycashsId:{
        type: String
    },
    date:{
        type: Date ,
    },
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
TablelistSchema.pre('save', function(next){
    let Tablelist = this;
    const model = mongoose.model("Tablelist", TablelistSchema);
    if (Tablelist.isNew) {
        // create
        next();
    }else{
        // update
        Tablelist.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Tablelist", TablelistSchema);