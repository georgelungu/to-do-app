const express = require('express');

const mongoose = require('mongoose');

let ToDo = require("./model/ToDo.js");

const app = express();
app.use(express.json());

// Implementing basic CORS policy, based on the address from where the requests will be made.
app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // the address from where the requests will be made.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

console.log("the server works!");

app.post('/api/todo', (req, res) =>
{
    console.log(req.body);
})

mongoose.connect("mongodb+srv://georgelungu:WoXKy6dXPWdWMak7@cluster0.gsflivo.mongodb.net/")





app.listen(5000, () => console.log('Server started on port 5000'));