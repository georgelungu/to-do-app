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
    setValue("");
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
    </form>
  );
}

export default TodoForm;