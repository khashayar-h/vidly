const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../models/users');
const Joi = require('joi');

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email : req.body.email});
    if(!user) return res.status(400).send('Invalid username or password !');

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send('Invalid username or password !');

    const token = jwt.sign({_id:user._id}, 'jwtPrivateKey')

    res.send(token);
});

function validate(user){
    const schema = {
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email()
    }

    return Joi.validate(user, schema);
}

module.exports = router;