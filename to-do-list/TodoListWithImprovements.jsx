import React, { useState, useCallback, useMemo } from "react";

/**
 * Memoized Todo Item
 * Re-renders ONLY when its props change
 */
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      {/* Using <label> improves accessibility by linking text + checkbox */}
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? "strikethrough" : ""}>
          {todo.text}
        </span>
      </label>

      {/* aria-label helps screen readers differentiate delete buttons */}
      <button
        aria-label={`Delete todo ${todo.text}`}
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
});

function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  /**
   * useCallback ensures stable function references
   * This prevents unnecessary re-renders of memoized children
   */
  const handleCompletedTodo = useCallback((todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDeleteTodo = useCallback((todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  }, []);

  const handleTodoAdd = useCallback(() => {
    const trimmedTodo = todoName.trim();
    if (!trimmedTodo) return;

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: crypto.randomUUID(), // safer than length-based IDs
        text: trimmedTodo,
        completed: false,
      },
    ]);

    setTodoName("");
  }, [todoName]);

  /**
   * Derived state (computed, not stored)
   * useMemo avoids recalculation on unrelated renders
   */
  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  return (
    <div className="main-container">
      <h1>Todo List</h1>

      {/* aria-describedby links input to helper text */}
      <div className="create-todo-container">
        <input
          type="text"
          placeholder="Create a todo"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          aria-describedby="todo-hint"
        />
        <button
          onClick={handleTodoAdd}
          disabled={!todoName.trim()}
          aria-disabled={!todoName.trim()}
        >
          Add
        </button>
      </div>

      <p id="todo-hint">Press Add to create a new todo</p>

      {/* aria-live announces changes to screen readers */}
      <div aria-live="polite" className="sr-only">
        {completedCount} todos completed
      </div>

      <ul className="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleCompletedTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

/**🏆 2. BEST Optimization to Implement LIVE (Interview Advice)

👉 Implement ONLY this combo live:

✅ React.memo + useCallback

Why?

Easy to explain

Clear performance benefit

No risk of bugs

Interviewers love it

🎯 What to say while coding:

“I’m memoizing the list item and stabilizing callbacks so unchanged todos don’t re-render.”

🔥 3. Follow-Up Performance Q&A (Interview Gold)
❓ Why not use useMemo everywhere?

Because memoization has overhead. I use it only when computation is expensive or rerenders are frequent.

❓ What happens if the list grows to 10,000 items?

I’d use list virtualization (e.g., react-window) so only visible items render.

❓ Why use crypto.randomUUID()?

It guarantees stable, unique keys and avoids bugs caused by index-based keys.

❓ Does React already optimize rendering?

Yes. React batches state updates and avoids DOM mutations when possible, but memoization helps at the component level.

❓ How would you further optimize?

Pagination, virtualization, debouncing input, or moving heavy logic off the main thread.

🎯 Final Interview Summary (Say This)

“The component is already efficient for small data. I optimized re-renders with memoization, used derived state correctly, and ensured accessibility. For very large lists, I’d virtualize.”
 */
