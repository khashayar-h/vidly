const express = require('express');
const app = express();
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const customersRouter = require('./routes/customers');
const rentalsRouter = require('./routes/rentals');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
.then(()=>{console.log('Conection was Succesful...')})
.catch(()=>{console.log('Connection was not Succesful')});

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/customers',customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});