import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { create, edit, toggleComplete, removeTodo } from "./todoSlice";

const Todo = () => {
  const [inputText, setInputText] = useState("");
  const [editText, setEditText] = useState("");
  const [changeText, setChangeText] = useState(-1);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(create(inputText));

    setInputText("");
  };

  const handleToggle = (id) => () => {
    dispatch(toggleComplete(id));
  };

  const handleDelete = (id) => () => {
    dispatch(removeTodo(id));
  };

  const handleEdit = (id, description) => () => {
    setChangeText(id);
    setEditText(description);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(edit({ id: changeText, description: editText }));

    setChangeText(-1);
    setEditText("");
  };
  // console.log(todos);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button type="submit">Create</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {changeText === todo.id ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
              />
              <button type="submit">Update</button>
            </form>
          ) : (
            <>
              {todo.description} {todo.isComplete ? "DONE" : ""}
              <button onClick={handleToggle(todo.id)}>Toggle</button>
              <button onClick={handleDelete(todo.id)}>Delete</button>
              <button onClick={handleEdit(todo.id, todo.description)}>
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
