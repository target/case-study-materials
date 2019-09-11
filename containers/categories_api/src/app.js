'use strict';
 
const express = require('express');
const app = new express();
var data = require('./data.json');
 
app.get('/categories', (req, res) => {
    res.send({"response": data.results }); 
});
 
app.get('/category/:id', (req, res) => {
    res.send({"response": req.params.id }); 
});

app.listen(5002, () => {
    console.log('Server up!');
});
