const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aparmentSchema = new Schema({
    code: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    rentId: {
        type: String,
    },
    clientId: {
        type: String,
        
    },
    propertyId:{
        type: Number,
       
    }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Aparment', aparmentSchema);