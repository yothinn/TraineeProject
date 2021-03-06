'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AttendancesSchema = new Schema({
    employeeId: {
        type: String
       
    },
    name: {
        type: String
        
    },
    lastname: {
        type: String
       
    },
    tel: {
        type: String
       
    },
    address: {
        type: String
       
    },
    jobPositions: {
        type: String    
    },
    age:{
        type: String
    },
    image:{
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