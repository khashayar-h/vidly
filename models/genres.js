const Joi  = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {
    type: String, 
    required:true, 
    minlength:3, 
    maxlength:10
    }
}));

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

exports.validate = validateGenre;
exports.Genre = Genre;