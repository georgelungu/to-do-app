const express = require('express');
const mongoose = require('mongoose');
let ToDoModel = require("./model/ToDoSchemaModel.js");


// Implementing basic CORS policy, based on the address from where the requests will be made.
const app = express();

app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // the address from where the requests will be made.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json());

mongoose.connect("mongodb+srv://georgelungu:WoXKy6dXPWdWMak7@cluster0.gsflivo.mongodb.net/")

console.log("the server works!");

app.post('/api/todo', (req, res) =>
{
    console.log("REQUEST BODY: ", req.body);
    // res.send(req.body)

    const title = req.body.todo;
    
    const comment = false

    const createdAt = Date.now();

    let toDo = new ToDoModel
    ({
        title, 
        comment,
        createdAt
    })

    toDo.save()
      .then(book => res.json(toDo))
      .catch(err => res.status(400).json({ success: false }));

})

app.get("/api/todo", (req, res) =>
{
    ToDoModel.find() // empty argument = return all the items from the collection.
    .then((todos) => 
    {
      res.json(todos);
      console.log("DATA SENT BACK TO CLIENT FROM GET REQ: ", todos)
    })
    .catch((err) => 
    {
      console.error("Error fetching To-Do items:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });
})

// delete request
app.delete(("/api/todo/:id", (req, res) =>
{
  console.log('am intrat pe DELETE request')
}))




app.listen(5000, () => console.log('Server started on port 5000'));