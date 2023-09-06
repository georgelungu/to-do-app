import React from "react";
import './ToDoForm.css'

function TodoForm({ addTodo }) 
{
  const [value, setValue] = React.useState("");

  const handleSubmit = e => 
  {
    e.preventDefault();
    if (!value) return;
    addTodo(value);

    console.log("TO DO FORM VALUE: ", value)

    setValue("");

    fetch("http://localhost:5000/api/todo", 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify
      ({ 
        todo: value // sending valid JSON data in your POST request's body.
      }), 
    })

      .then((response) => response.json())

      .then((response) => 
      {
        console.log("FETCH RESPONSE: ", response);
      })

      .catch((error) => 
      {
        console.log(error);
      });
      
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Type your to-do..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {/* The button also handle the onSubmit function. */}
      <button className="add">Add</button>
    </form>
  );
}

export default TodoForm;