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
    floor: { 
        type: String, 
        required: true 
    },
    rentId: {
        type: String,
    },
    clientId: {
        type: String,
        
    },
    propertyId:{
        type: Schema.Types.ObjectId, 
        ref:'Property', 
        required: true 
    },
    
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Aparment', aparmentSchema);