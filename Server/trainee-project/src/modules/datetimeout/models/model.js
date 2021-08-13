'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DatetimeoutSchema = new Schema({
    employeeId: {
        type: String,
       
    },
    dateIn: {
        type: String
    },
    timeIn: {
        type: String
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
DatetimeoutSchema.pre('save',(next) => {
    let Datetimeout = this;
    const model = mongoose.model("Datetimeout", DatetimeoutSchema);
    if (Datetimeout.isNew) {
        // create
        next();
    }else{
        // update
        Datetimeout.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Datetimeout", DatetimeoutSchema);