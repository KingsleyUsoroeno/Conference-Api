const Joi = require('joi');

function validateSpeaker(speaker){
    const schema = {
        name: Joi.string().min(6).required(),
        topic: Joi.string().min(6).required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).required(),
        duration:Joi.number().positive().required()
    }
    return Joi.validate(speaker, schema);
}

function validateAttendant(attendant){
    const schema = {
        firstName: Joi.string().min(6).required(),
        lastName: Joi.string().min(6).required(),
        email:Joi.string().required(),
        password:Joi.string().min(8).required()
    }
    return Joi.validate(attendant, schema);
}

module.exports = { validateSpeaker, validateAttendant }