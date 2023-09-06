import React, {useState, useEffect} from 'react';
import Todo from './components/ToDo';
import TodoForm from './components/ToDoForm';
import './App.css';

function App() 
{
  console.log("The front-end works on localhost:3000.")

  const [todos, setTodos] = useState
  ([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/todo")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA RECEIVED FROM SERVER: ", data);
        const newTodos = data.map((item) => ({text: item.title, isCompleted: false})
        )
        console.log("MAPPED DATA FROM FETCH: ", newTodos);
        setTodos(newTodos); // Update the todos state with the data from the server
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const addTodo = text => 
  {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => 
  {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => 
  {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
      <label id='label'>TO DO LIST</label>
        {todos.map((todo, index) => 
        (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}

        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
