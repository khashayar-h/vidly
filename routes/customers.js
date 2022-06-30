const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

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

router.get('/', async (req, res)=>{
    const customer = await Customer.find().sort({name:1});
    res.send(customer);
});

router.get('/:id', async (req, res)=> {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('The customer with specified ID was not fount...');
    res.send(customer);
});

router.post('/', async (req,res)=>{

    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name : req.body.name,
        phone : req.body.phone,
        isGold : req.body.isGold
    });

    customer = await customer.save();

    res.send(customer);

});

router.put('/:id', async (req, res) =>{
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name : req.body.name, 
        phone : req.body.phone,
        isGold : req.body.isGold
    }, {new : true});

    if(!customer) return res.status(404).send('The Customer with given ID was not found...');

    res.send(customer);
});

router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send('The Customer with given ID was not found...');

    res.send(customer);
});

function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).max(10).required(),
        phone : Joi.string().min(3).max(10).required(),
        isGold : Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

module.exports = router;