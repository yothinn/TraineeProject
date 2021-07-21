'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AttendancesSchema = new Schema({
    employeeId: {
        type: String,
        required: 'Please fill a Attendances employId',
    },
    name: {
        type: String,
        required: 'Please fill a Attendances name',
    },
    lastname: {
        type: String,
        required: 'Please fill a Attendances lastname',
    },
    tel: {
        type: String,
        required: 'Please fill a Attendances tel',
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
AttendancesSchema.pre('save',(next) => {
    let Attendances = this;
    const model = mongoose.model("Attendances", AttendancesSchema);
    if (Attendances.isNew) {
        // create
        next();
    }else{
        // update
        Attendances.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Attendances", AttendancesSchema);