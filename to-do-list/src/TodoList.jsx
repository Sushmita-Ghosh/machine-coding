import React from "react";
import { useState } from "react";

function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  const handleCompletedTodo = (todoId) => {
    // console.log(todoId);
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });

    // console.log(newTodos);

    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    /** For handling spaces */
    if (todoName.trim() === "") return;

    /** create the new todo */
    const newTodo = {
      id: `input-${todos.length + 1}`,
      text: todoName.trim(), // we don't want the spaces in the name
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodoName(""); // clear the search
  };

  const handleDeleteTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  };

  return (
    <div className="main-container">
      <div className="header">
        <h1>TodoList</h1>
      </div>
      <div className="todo-list-contaner">
        <div className="create-todo-container">
          <input
            type="text"
            placeholder="Create a todo"
            className="input-add"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <button className="add-btn" onClick={() => handleTodoAdd()}>
            Add
          </button>
        </div>
        <ul className="todos">
          {todos.map((todo) => (
            /** Always have key in any list */
            <li className="todo-item" key={todo.id}>
              <input
                type="checkbox"
                className="padding-class"
                checked={todo.completed}
                onChange={() => handleCompletedTodo(todo.id)}
              />
              <span
                className={`padding-class ${
                  todo.completed ? "strikethrough" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                className="padding-class delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;

/**
 * import React, { useState } from "react";

/**
 * TodoList
 * ----------
 * A simple, accessible todo list with:
 * - Keyboard support
 * - Screen reader support
 * - Clean state management
 * - Safe ID generation
 
function TodoList() {
  // Holds the current input value
  const [todoName, setTodoName] = useState("");

  // Holds the list of todos
  const [todos, setTodos] = useState([]);

  /**
   * Adds a new todo.
   * - Prevents empty or whitespace-only todos
   * - Uses a stable unique ID
   
  const handleTodoAdd = () => {
    const value = todoName.trim();
    if (!value) return;

    const newTodo = {
      id: Date.now().toString(), // safer than using array length
      text: value,
      completed: false,
    };

    // Functional update avoids stale state issues
    setTodos((prev) => [...prev, newTodo]);
    setTodoName("");
  };

  /**
   * Toggles completion state of a todo
   
  const handleCompletedTodo = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  /**
   * Deletes a todo by ID
   
  const handleDeleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Todo List</h1>
      </header>

      {/* 
        Use a form for semantic correctness:
        - Enables Enter key submission
        - Improves accessibility
      
      <form
        className="create-todo-container"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh
          handleTodoAdd();
        }}
      >
        {/* Accessible label for screen readers 
        <label htmlFor="todo-input">Create a todo</label>

        <input
          id="todo-input"
          type="text"
          className="input-add"
          placeholder="Type a todo and press Enter"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          aria-describedby="todo-hint"
        />

        {/* Help text announced by screen readers *
        <p id="todo-hint" className="sr-only">
          Press Enter or click Add to create a todo
        </p>

        <button
          type="submit"
          className="add-btn"
          disabled={!todoName.trim()}
          aria-disabled={!todoName.trim()}
        >
          Add
        </button>
      </form>

      {/* Live region to announce changes to assistive tech 
      <div aria-live="polite" className="sr-only">
        {todos.length} todos in the list
      </div>

      <ul className="todos">
        {todos.length === 0 && (
          <li className="empty-state">No todos yet</li>
        )}

        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            {/* Native checkbox provides built-in accessibility 
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCompletedTodo(todo.id)}
              />

              <span
                className={`padding-class ${
                  todo.completed ? "strikethrough" : ""
                }`}
              >
                {todo.text}
              </span>
            </label>

            {/* aria-label clarifies which todo is being deleted 
            <button
              className="delete-btn"
              aria-label={`Delete todo ${todo.text}`}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

 */
