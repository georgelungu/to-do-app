import React, {useState} from 'react';
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

  const addTodo = text => 
  {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    // create a POST request here maybe...
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
