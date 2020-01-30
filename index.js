// import our dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('config');
const PORT = process.env.NODE_ENV || 3000;

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
const dbUserName = config.get('database.username');
const dbPassword = config.get('database.password');

const url =  `mongodb+srv://${dbUserName}:${dbPassword}@cluster0-jzcgx.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err, client) =>{
    if(err){
       return console.log(`error connecting to db ${err}`)
    }else{
        console.log('Connected to DB');  
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});



