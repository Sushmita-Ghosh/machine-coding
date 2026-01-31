# To Do List

[REF] (https://namastedev.com/practice/todo-list)

### 🟢 Rule of Thumb (Say this in interview)

“I only add ARIA when native HTML isn’t enough. Native elements come first.”

This is the correct accessibility mindset.

✅ 1. aria-label (Most Common & Useful)

Use when a button’s purpose isn’t clear from text alone.

🔹 Delete button
<button
aria-label={`Delete todo ${todo.text}`}
onClick={() => handleDeleteTodo(todo.id)}

> Delete
> </button>

🎯 Why:

Screen readers will read “Delete todo Buy milk”

Prevents ambiguity when multiple buttons exist

✅ 2. aria-checked (When NOT using native checkbox UI)

⚠️ Since you already use <input type="checkbox">, you do NOT need this.

But if you were using a custom checkbox:

<div role="checkbox" aria-checked={todo.completed} />

🎯 Interview line:

“ARIA is needed only when native semantics are missing.”

✅ 3. aria-live (VERY impressive in interviews)

Use to announce dynamic updates like adding or deleting todos.

🔹 Add a live region

<div aria-live="polite" className="sr-only">
  {todos.length} todos in the list
</div>

🎯 Why:

Screen readers announce updates automatically

Excellent for dynamic apps

✅ 4. aria-disabled (for custom-disabled UI)

If you visually disable the Add button:

<button
disabled={!todoName.trim()}
aria-disabled={!todoName.trim()}

> Add
> </button>

🎯 Why:

Some assistive tech relies on ARIA state

✅ 5. aria-describedby (Helpful hints)

Attach help text to inputs.

<input
  id="todo-input"
  aria-describedby="todo-hint"
/>

<p id="todo-hint">Press Enter or click Add to create a todo</p>

🎯 Great for onboarding + accessibility.

❌ ARIA You Should NOT Use Here (Important!)

❌ Do NOT add these unnecessarily:

role="button" on <button>

role="checkbox" on <input type="checkbox">

aria-checked on native checkbox

🎯 Interview line:

“ARIA should not override native semantics.”

🏆 Minimal ARIA Set (Perfect for Machine Coding)

If you add just these, you’re golden:

<button aria-label={`Delete todo ${todo.text}`}>Delete</button>

<div aria-live="polite">
  {todos.length} todos in the list
</div>

<input aria-describedby="todo-hint" />

✅ 1. Accessibility Improvements (VERY IMPORTANT)
🔹 Associate labels with inputs

Right now, screen readers don’t know what the inputs are for.

Improvement:

<label htmlFor="todo-input">Create a todo</label>
<input
id="todo-input"
type="text"
value={todoName}
onChange={(e) => setTodoName(e.target.value)}
/>

For checkbox:

<label htmlFor={`todo-${todo.id}`}>
<input
id={`todo-${todo.id}`}
type="checkbox"
checked={todo.completed}
onChange={() => handleCompletedTodo(todo.id)}
/>
{todo.text}
</label>

🎯 What to say in interview:

“I’d improve accessibility by adding labels so screen readers can associate inputs correctly.”

✅ 2. Keyboard Accessibility (Big Plus)
🔹 Allow Enter key to add a todo

Right now only the button works.

Improvement:

onKeyDown={(e) => {
if (e.key === "Enter") handleTodoAdd();
}}

🎯 Interview line:

“I’d ensure full keyboard support so users don’t need a mouse.”

✅ 3. ARIA attributes for better screen reader support
🔹 Mark completed todos
<span
aria-checked={todo.completed}
role="checkbox"

>

Or simpler:

<li aria-label={todo.completed ? "Completed todo" : "Incomplete todo"}>

🎯 Interview line:

“I’d use ARIA attributes to expose state changes like completed todos.”

✅ 4. Improve ID generation (important correctness)
❌ Current
id: `input-${todos.length + 1}`

This can break if items are deleted.

✅ Better (even without libraries)
id: Date.now().toString()

🎯 Interview line:

“Using array length for IDs can cause collisions; I’d use a stable unique ID.”

✅ 5. Use Functional State Updates Everywhere (best practice)
❌ Current
setTodos(newTodos)

✅ Better
setTodos(prev =>
prev.map(todo =>
todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
)
)

🎯 Interview line:

“Functional updates prevent stale state bugs.”

✅ 6. Semantics: Use <form> instead of divs (Accessibility + UX)
❌ Current

<div className="create-todo-container">

✅ Better

<form
  onSubmit={(e) => {
    e.preventDefault();
    handleTodoAdd();
  }}
>

✔️ Enables Enter key
✔️ Better semantics
✔️ Screen reader friendly

✅ 7. Visual & UX Improvements (Quick Mentions)

Disable “Add” button when input is empty

<button disabled={!todoName.trim()}>

Show empty state

{todos.length === 0 && <p>No todos yet</p>}

🎯 Interview line:

“I’d add empty states and button disabling for better UX.”

✅ 8. Performance (Optional, if asked)

Wrap handlers in useCallback

Memoize todo items if list grows

🎯 Interview line:

“If the list grows large, I’d memoize items to avoid unnecessary re-renders.”

🧠 First: Say This (Very Important)

“For a small todo list, performance is already fine. I’d optimize only if the list grows large or re-renders become noticeable.”

This shows engineering maturity.

✅ 1. Avoid Unnecessary Re-Renders (High Value)
🔹 Problem

Every state change re-renders all todo items.

✅ Solution: Extract + memoize TodoItem
const TodoItem = React.memo(function TodoItem({
todo,
onToggle,
onDelete,
}) {
return (
<li className="todo-item">
<label>
<input
type="checkbox"
checked={todo.completed}
onChange={() => onToggle(todo.id)}
/>
<span className={todo.completed ? "strikethrough" : ""}>
{todo.text}
</span>
</label>
<button
aria-label={`Delete todo ${todo.text}`}
onClick={() => onDelete(todo.id)} >
Delete
</button>
</li>
);
});

🎯 Interview line:

“Memoizing list items prevents re-rendering unchanged todos.”

✅ 2. Stabilize Function References with useCallback

Without this, memoization won’t help.

const handleCompletedTodo = useCallback((id) => {
setTodos(prev =>
prev.map(todo =>
todo.id === id ? { ...todo, completed: !todo.completed } : todo
)
);
}, []);

const handleDeleteTodo = useCallback((id) => {
setTodos(prev => prev.filter(todo => todo.id !== id));
}, []);

🎯 Interview line:

“useCallback keeps handler references stable so memoized children don’t re-render.”

✅ 3. Derived State Instead of Extra State (Micro-optimization)

Avoid storing values you can compute.

❌ Don’t store
const [completedCount, setCompletedCount] = useState(0);

✅ Do this instead
const completedCount = useMemo(
() => todos.filter(t => t.completed).length,
[todos]
);

🎯 Interview line:

“Derived data should be computed, not stored.”

✅ 4. List Virtualization (Only for Very Large Lists)

If there are 1000+ todos, rendering all at once is expensive.

🔹 Use:

react-window

react-virtualized

🎯 Interview line:

“For large lists, I’d virtualize rendering so only visible items mount.”

This is a senior-level insight.

✅ 5. Avoid Inline Functions in JSX (Minor but Correct)
❌ Current
onClick={() => handleDeleteTodo(todo.id)}

✅ Optimized (only when memoized)
const onDelete = useCallback((id) => handleDeleteTodo(id), []);

🎯 Interview line:

“Inline functions can cause unnecessary re-renders in large lists.”

✅ 6. Batch State Updates (React already does this)

Modern React automatically batches updates in event handlers — mention this.

🎯 Interview line:

“React batches state updates, so this component already benefits from it.”

🏆 Ideal Performance Summary (Say This)

“For small lists, this is performant enough. If the list grows, I’d memoize todo items, stabilize callbacks, and potentially virtualize the list. I’d only optimize when there’s a real performance need.”

This answer is perfect.
