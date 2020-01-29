const mongoose = require('mongoose');
const Speaker = require('./speakers');

const attendantSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String
    },
    speaker:{
        name:{
            type: String,
            require: true
        },
        topic:{
            type: String,
            require: true
        },
        email:{
            type: String,
            require: true, 
            unique: true
        },
    
        password:{
            type: String,
            length: String
        },
        
        duration:{
            type: Number,
            require: true
        }
    }
});
const Attendant = mongoose.model('attendant', attendantSchema)
module.exports = Attendant;