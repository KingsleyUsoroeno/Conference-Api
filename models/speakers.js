const mongoose = require('mongoose');
 
const speakerSchema = mongoose.Schema({
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
    },
    attendee:{
        type: Array
    }
});

const Speaker = mongoose.model('speaker', speakerSchema, 'speaker');
module.exports = Speaker;