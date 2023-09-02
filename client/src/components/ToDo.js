import React from "react";
import './ToDo.css'

function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}
        <div className="button-container">
          <button className="complete" onClick={() => completeTodo(index)}>
            <span className="circle1" />
            <span className="circle2" />
            <span className="circle3" />
            <span className="circle4" />
            <span className="circle5" />
            <span className="text">{todo.isCompleted ? "Completed" : "Complete"}</span>
          </button>

          {/* <button className="remove" onClick={() => removeTodo(index)}>
            x
          </button> */}
          <button className="btn" onClick={() => removeTodo(index)}>
            <p className="paragraph"> delete </p>
            <span className="icon-wrapper">
              <svg
                className="icon"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    );
  };

  export default Todo;