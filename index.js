const express = require('express');
const Joi  = require('joi');
const app = express();

app.use(express.json());

var genres = [
    {id:'1', name:'Action'},
    {id:'2', name:'Horror'},
    {id:'3', name:'Comedy'}
]

app.get('/api/genres', (req,res)=>{
    res.send(genres);
});

app.get('/api/genres/:id', (req,res)=>{
    const found = findGenre(req.params);
    if(!found) return res.status(404).send('The genre with the given ID was not found.');
    res.send(found);
});

app.post('/api/genres/', (req,res)=>{
    const result = validateGenre(req.body);
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res)=>{
    const found = findGenre(req.params);
    if(!found) return res.status(404).send('The genre with the given ID was not found.');

    const result = validateGenre(req.body);
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    found.name = req.body.name;
    res.send(found);
});

app.delete('/api/genres/:id', (req,res)=>{
    const found = findGenre(req.params);
    if(!found) return res.status(404).send('The genre with the given ID was not found.');

    const index = genres.indexOf(found);
    genres.splice(index, 1);
    res.send(found);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});

function findGenre(genre){
    return found = genres.find(c=> c.id === genre.id);
}

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}