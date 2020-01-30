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
        type: String,
        require: true
    }
        
});
const Attendant = mongoose.model('attendant', attendantSchema)
module.exports = Attendant;