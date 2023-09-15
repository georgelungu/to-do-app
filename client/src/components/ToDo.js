import React, { useState } from "react";
import './ToDo.css'

function Todo({ todo, index, completeTodo, removeTodo, id, updateToDo }) 
{
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const setEditButton = () => 
  {
    setIsEditing(true);
  };

  const handleSaveButton = () => 
  {
    updateToDo(todo.id, newText);
    setIsEditing(false);
  };
  
    return (
      <div>
        {isEditing ? 
        (
          <div className="editing">
            <input
              className="input-edit"
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button className="save" onClick={handleSaveButton}>Save</button>
            
          </div>
        ) 
        : 
        (
          <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          >
            {todo.text}
            {/* Transform each element into an input to update and save it later... */}
            {/* <input value={todo.text} /> */}

            <div className="button-container">
              {/* Start Complete Button */}
              <button className="complete" onClick={() => completeTodo(index)}>
                <span className="circle1" />
                <span className="circle2" />
                <span className="circle3" />
                <span className="circle4" />
                <span className="circle5" />
                <span className="text">
                  {todo.isCompleted ? "Completed" : "Complete"}
                </span>
              </button>
              {/* End Complete Button */}
            
              {/* Start Edit Button */}
              <button className="edit-button" onClick={setEditButton}>
                <svg className="edit-svgIcon" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
              </button>
              {/* End Edit Button */}

              {/* Start Delete Button */}
              <button className="btn" onClick={() => removeTodo(index)}>
                <p className="paragraph"> Delete </p>
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
              {/* End Delete Button */}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Todo;