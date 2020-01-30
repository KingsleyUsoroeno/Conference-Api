// import our dependencies
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('config');

// import our routes
const speakers = require('./routes/speakers');
const attendants = require('./routes/attendee');

// configure our app
const app = express();

// tells our application to use the body-parser middle ware and parse all incoming
// request body as of type Json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/speakers', speakers);
app.use('/attendee', attendants)

// connect to our database with config data
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL,{useUnifiedTopology: true, useNewUrlParser: true},(err, client) =>{
    if(err){
       return console.log(`error connecting to db ${err}`)
    }else{
        console.log('Connected to DB');  
    }
});

const PORT = process.env.NODE_ENV || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});



