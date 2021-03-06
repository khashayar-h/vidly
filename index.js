const express = require('express');
const app = express();
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const customersRouter = require('./routes/customers');
const rentalsRouter = require('./routes/rentals');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL Error - jwtKey is not set');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(()=>{console.log('Conection was Succesful...')})
.catch(()=>{console.log('Connection was not Succesful')});

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers',customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});