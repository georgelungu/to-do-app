import React, {useState, useEffect} from 'react';
import Todo from './components/ToDo';
import TodoForm from './components/ToDoForm';
import './App.css';

function App() 
{
  console.log("The front-end works on localhost:3000.")

  const [todos, setTodos] = useState([]);

  const [show, setShow] = useState(false);

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

  function isOn()
  {
    setShow(prevShow => !prevShow);
  }

  return (
    <div className="app">
      <div className="todo-list">
        <label id="label">TO DO LIST</label>
        <div id="show" onClick={isOn}>
          <button className="complete">
            <span className="circle1" />
            <span className="circle2" />
            <span className="circle3" />
            <span className="circle4" />
            <span className="circle5" />
            <span className="text">{show ? "Hide Todo's" : "Show Todo's"}</span>
          </button>
        </div>{show ? todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        )) : null}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
