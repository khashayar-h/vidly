const express = require('express');
const app = express();
const genresRouter = require('./routes/genres')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
.then(()=>{console.log('Conection was Succesful...')})
.catch(()=>{console.log('Connection was not Succesful')});

app.use(express.json());
app.use('/api/genres', genresRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});