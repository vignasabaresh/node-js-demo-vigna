require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {request, response} = require("express");
const app = express();
const db = require('./postgres');
const port = process.env.PORT || 3008;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

app.get('/', (request, response) => {
        response.json({info: 'Our class is live.'})
})

app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port,() => {
    console.log(`App is running on port ${port}.`)
})

