'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DatetimeSchema = new Schema({
    employeeId: {
        type: String,
       
    },
    date: {
        type: String,
    },
    timeIn: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {},
    updateby: {}
});
DatetimeSchema.pre('save',(next) => {
    let Datetime = this;
    const model = mongoose.model("Datetime", DatetimeSchema);
    if (Datetime.isNew) {
        // create
        next();
    }else{
        // update
        Datetime.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Datetime", DatetimeSchema);