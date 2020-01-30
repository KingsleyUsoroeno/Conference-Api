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
app.use('/attendee', attendants);

// for test purpose
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my root route');
})

// connect to our database with config data
const DB_URL = process.env.DB_URL;

mongoose.connect(`mongodb+srv://${DB_URL}?retryWrites=true&w=majority`,(err, client) =>{
    if(err){
       return console.log(`error connecting to db ${err}`)
    }else{
        console.log('Connected to DB');  
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});



