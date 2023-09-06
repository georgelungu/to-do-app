const mongoose = require("mongoose");

  // Destructuring 'Schema' and 'model' from 'mongoose'.
// const { Schema, model } = mongoose;

const toDoSchema = new mongoose.Schema
({
  title: String,
  comment: String,
  createdAt: Date,
});

const ToDoModel = mongoose.model("ToDo", toDoSchema);

module.exports = ToDoModel;