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
        // console.log("DATA RECEIVED FROM SERVER: ", data);
        const newTodos = data.map((item) => ({text: item.title, isCompleted: false, id: item._id, createdAt: item.createdAt})
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
    // send a delete request here

    fetch(`http://localhost:5000/api/todo/${newTodos[index].id}`, 
    {
      //HTTP method set to DELETE.
      method: "DELETE",
      //Set the headers that specify you're sending a JSON body request and accepting JSON response
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(data => console.log("DATA RETURNED AFTER DELETE REQUEST: ", data))

    console.log("ITEM ABOUT TO BE DELETED: ", newTodos[index].id)
    // you don't actually need to splice in front-end.
    // you can get the elements returned from fetch and update state with them.
    newTodos.splice(index, 1);

    setTodos(newTodos);
  };

  const updateToDo = (todoId, newText) =>
  {
    // console.log("UPDATED TEXT FROM ToDo.js: ", todoId)

    const updatedTodos = todos.map((todo, index) => 
    {
      if (todo.id === todoId) 
      {
        fetch(`http://localhost:5000/api/todo/${todo.id}`,
        {
          method: "PUT",
          headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // PUT request body as JSON string.
          body: JSON.stringify(todo)
        })
        .then(data => data.json())
        .then(info => console.log(info))

        return { ...todo, text: newText };
      }
      return todo;
    });

    const newTodos = [...updatedTodos]

    setTodos(newTodos)
    
    console.log("MODIFIED TODO'S: ",todos)
  }

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
            id={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateToDo={updateToDo}
          />
        )) : null}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
