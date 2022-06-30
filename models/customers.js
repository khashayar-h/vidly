const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold : {
        type: Boolean,
        default : false
    },
    phone : {
        type: Number,
        required : true,
        minlength: 3,
        maxlength : 10
    },
    name : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 10
    }
}));

function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).max(10).required(),
        phone : Joi.string().min(3).max(10).required(),
        isGold : Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

// module.exports is the same as exports but we should call a method on exports when we use it without module
exports.validate = validateCustomer;
exports.Customer = Customer;