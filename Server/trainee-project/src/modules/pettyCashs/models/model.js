'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PettycashsSchema = new Schema({
    name: {
        type: String,
        // required: 'Please fill a Attendances name',
    },
    lastName: {
        type: String,
        // required: 'Please fill a Attendances lastName',
    },
    financialAmount: {
        type: Number,
        // required: 'Please fill a Attendances limit',
    },
    position: {
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