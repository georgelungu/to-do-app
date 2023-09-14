const express = require('express');
const cors = require('cors'); // Import the cors middleware.
const mongoose = require('mongoose');
let ToDoModel = require("./model/ToDoSchemaModel.js");

// Implementing basic CORS policy, based on the address from where the requests will be made.
const app = express();

// app.use(function(req, res, next) 
// {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // the address from where the requests will be made.
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// });

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's actual domain.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // List of allowed HTTP methods.
}));

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
      console.log("DATA SENT SUCCESSFULY TO CLIENT")
    })
    .catch((err) => 
    {
      console.error("Error fetching To-Do items:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });
})

// delete request
app.delete("/api/todo/:id", (req, res) =>
{
  console.log("REQ PARAMS ID: ", req.params.id)

  // ToDoModel.findByIdAndRemove({_id: req.params.id})
  // .then(trimmedToDos => res.json(trimmedToDos)) // this line sends me the data that i have deleted, not the list with the remained item.

  ToDoModel.findByIdAndRemove({ _id: req.params.id })
    .then(removedItem => {
      // After removing the item, fetch the remaining items
      return ToDoModel.find({});
    })
    .then(remainingItems => {
      // Send the remaining items as JSON response
      res.json(remainingItems);
    })
    .catch(error => {
      // Handle errors here
      res.status(500).json({ error: "An error occurred" });
    });
})

app.put("/api/todo/:id", (req, res) =>
{
  
})




app.listen(5000, () => console.log('Server started on port 5000'));