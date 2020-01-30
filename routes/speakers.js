const express = require("express");
const router = express.Router();
const Speaker = require('../models/speakers');
const {validateSpeaker} = require('../validation/validation');
const bcrypt = require("bcrypt-nodejs");
const attendee = require('../models/attendants');

// Get All Speakers from the Database
// /speakers/all
router.get('/all', async (req, res) =>{
    try{
        const allSpeakers = await Speaker.find({});
        console.log(allSpeakers);
        
        res.status(200).json({data: allSpeakers});
        
    }catch(err){
        res.status(500).send(err);
    }
});

// Get speaker by their id
router.get('/:speakerId', async (req, res) => {
    const speakerId = req.params.speakerId;
    try{
        if(speakerId === undefined){
            return res.status(404).json({message: 'Id does not exist'})
        }
        const speaker = await Speaker.findById(speakerId);
        res.json(speaker);
    }catch(err){
        res.status(404).send(err);
    }
});

// Add a speaker to the Db
// validate the details coming in with joi
// if valid save detail to DB
// return a success message back to the user
router.post('/add', async (req, res) => {
    // validate our req.body with our middleware functions
    const { error } = validateSpeaker(req.body);
    if(error) return res.status(400).json({error: error.details[0].message})
    // check if these user already exists in our Db
    const speaker = await Speaker.findOne({email: req.body.email});
    console.log(speaker);
    
    if(speaker){
        return res.status(400).json({message: 'Speaker already registered'})
    }
    // inputs are okay bycrpt the users password
    // bycpyt the users password
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        // Store hash in your password DB.
        try{
            if(err) return res.json({message: err})
            console.log(hash);
            
          const speaker = new Speaker ({
                name: req.body.name,
                topic: req.body.topic,
                email:req.body.email,
                password: hash,
                duration:req.body.duration
          });

          speaker.save(function(err, result){
            if(err) return res.status(500).send(err);
            res.status(201).json({data: result});
          });
          
        }catch(err){
            res.status(500).send(err);
        }
    });
});

// update a speaker in the Db
// /speakers/id of the speaker
router.put('/:speakerId', async (req, res) =>{
    const speakerId = req.params.speakerId;
    console.log(req.body.name);
    
    try{
        await Speaker.findOneAndUpdate({_id:speakerId}, {name:req.body.name}, (err, result) =>{
            if(err) return res.status(500).send(err)
            res.status(200).json(result)
            console.log(`updated Speaker Id is ${result}`);
        });
    }catch(err){
        res.status(404).send(err);
    } 
});

// Delete a speaker
router.delete('/:speakerId', async (req, res) =>{
    const speakerId = req.params.speakerId;
    try{
        const removedPost = await Speaker.deleteOne({_id: speakerId});
        res.json({message:'speaker deleted successfully', removedPost});
    }catch(err){
        res.status(404).json({message: err})
    }
});

module.exports = router;

