const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const {validateAttendant} = require('../validation/validation');
const Attendant = require('../models/attendants');

// Get All attendees
router.get('/all', async (req, res) =>{
    try{
        const allAttendants = await Attendant.find();
        res.json({data: allAttendants});
        
    }catch(err){
        res.status(500).send(err);
    }
});

// Get speaker by their id
router.get('/:attendantId', async (req, res) => {
    const attendantId = req.params.attendantId;
    try{
        if(attendantId === undefined){
            return res.status(404).json({message: 'Id does not exist'})
        }
        const attendant = await Attendant.findById(attendantId);
        res.json(attendant);
    }catch(err){
        res.status(404).send(err);
    }
});

// Add an attendees to the Db
router.put('/', (req, res) => {

});

// Add an attendant to the database
router.post('/', async (req, res) =>{
    // validate our req.body with our middleware functions
    const { error } = validateAttendant(req.body);
    if(error) return res.status(400).json({error: error.details[0].message})
    // check if these user already exists in our Db
    const attendant = await Attendant.findOne({email: req.body.email});
    console.log(attendant);
    
    if(attendant){
        return res.status(400).json({message: 'Attendant already exists'})
    }
    // inputs are okay bycrpt the users password
    // bycpyt the users password
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        // Store hash in your password DB.
        try{
            if(err) return res.json({message: err})
            console.log(hash);
            
          const attendant = new Attendant ({
            firstName: req.body.name,
            lastName: req.body.topic,
            email:req.body.email,
            password: hash,
            name:'speaker',
            topic:'topic',
            email:'speaker@gmail.com',
            password:'12345',
            duration:'12345'
          });

          attendant.save(function(err, result){
            if(err) return res.status(500).send(err);
            res.status(201).json({
                "message":"Attendant created succesfully",
                data:result
            });
          });
          
        }catch(err){
            res.status(500).send(err);
        }
    });
});

// Delete an attendees
router.delete('/:id', (req, res) =>{

});

module.exports = router;

