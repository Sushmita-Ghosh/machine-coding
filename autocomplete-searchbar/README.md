# Autocomplete SearchBar

<img width="1720" height="837" alt="image" src="https://github.com/user-attachments/assets/68f71bd4-1121-4de0-95ab-ad698e96a089" />

[REF](https://www.youtube.com/watch?v=fL0gfeDHKP0&list=PLlasXeu85E9cciv04MYWscodnbRFqACsH&index=4)

## Basic Autocomplete

```javascript
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handlefetchData = async () => {
    const resultPromise = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const jsonData = await resultPromise.json();
    setResults(jsonData?.recipes);
  };

  useEffect(() => {
    handlefetchData();
  }, [input]);

  const handleChangeSearchBar = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="app">
      <h1>Autocomplete SearchBar</h1>
      <div>
        <input
          type="text"
          className="search-bar"
          value={input}
          onChange={(e) => handleChangeSearchBar(e)}
        />
      </div>

      {/* Results Container */}
      {results && (
        <div className="results-container">
          {results.map((result) => (
            <div className="result" key={result.id}>
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
```

## KeyUp & KeyDown

### 1️⃣ onKeyDown

- Fires immediately when a key is pressed, before the browser processes it.
- Example: You press ArrowDown → the event fires before the cursor moves in an input.
- Good for instant reactions, like
  - Moving selection in a list
  - Preventing default browser behavior (e.preventDefault())
- Most autocomplete implementations use onKeyDown because you want real-time control.

### 2️⃣ onKeyUp

- Fires after you release the key.
- Example: You press ArrowDown → keyDown fires → you release → keyUp fires.
- At this point, the browser may have already processed the key (like moving the cursor).
- Rarely used for autocompletes because:
  - The action feels slightly delayed
  - You can’t reliably prevent default browser behavior (like cursor movement in input)

### 3️⃣ Why we use keyDown for autocomplete navigation

- Arrow keys don’t actually type anything — they only move the cursor in an input.
- If you wait for keyUp, the browser may have already moved the cursor in a way you don’t want.
- keyDown allows you to do:

```js
e.preventDefault(); // stop cursor from moving
setActiveIndex(nextIndex); // update highlighted item immediately
setInput(results[nextIndex].name); // update input text
```

- keyDown → “I see you pressed the key”
- keyUp → “I see you released the key”

| Event     | Fires when?     | Use case in autocomplete                                                     |
| --------- | --------------- | ---------------------------------------------------------------------------- |
| `keyDown` | Key is pressed  | Move selection, update input immediately, prevent default cursor movement ✅ |
| `keyUp`   | Key is released | Rarely used, usually slower, harder to control input ✅                      |

_💡 In short:_  
_We don’t use keyUp here because the behavior would feel slightly delayed and less smooth._  
_keyDown gives instant keyboard navigation, prevents the cursor from jumping, and is what almost all production autocompletes do._

# ARIA Labels in Autocomplete Components

When building interactive components like autocompletes or dropdowns, **accessibility** is crucial so that users relying on **screen readers or assistive technologies** can navigate and use them effectively. ARIA (Accessible Rich Internet Applications) attributes help communicate **state, role, and behavior** of UI elements.

---

## 1. `role="combobox"`

**What:**

- Declares that an input is a **combobox**, i.e., an input that controls an associated list of options.

**Why:**

- Screen readers announce the input as a **searchable/selectable field**.
- Users know they can type to filter options.

**Example:**

```html
<input type="text" role="combobox" />
```

## 2. `aria-expanded`

**What:**

- Indicates whether the dropdown is currently visible.
- Accepts `true` or `false`.

**Why:**

- Tells screen readers whether the list of options is open.
- Helps users know if results are available.

**Example:**

```html
<input type="text" role="combobox" aria-expanded="true" />
```

## 3. `aria-controls`

**What:**

- References the **ID of the element** that the input controls, usually the results container.

**Why:**

- Helps assistive technologies associate the input with the dropdown list.
- Screen readers can inform the user that the input is connected to a set of options.

**Example:**

```html
<input type="text" aria-controls="results-list" />
<div id="results-list">...</div>
```

## 4. `aria-activedescendant`

**What:**

- Specifies which **child element of the listbox** is currently highlighted.
- Should match the `id` of the active option.

**Why:**

- When navigating with the keyboard (ArrowUp / ArrowDown), screen readers announce the **currently active item**.
- Users always know which option is highlighted.

**Example:**

```html
<input aria-activedescendant="result-2" />
<div id="result-2">Apple Pie</div>
```

## 5. `role="listbox"`

**What:**

- Indicates that a container holds a **list of selectable options**.

**Why:**

- Screen readers recognize it as a selectable list controlled by the input.
- Users understand the relationship between the input and the options.

**Example:**

```html
<div role="listbox" id="results-list">...</div>
```

## 6. `role="option"`

**What:**

- Marks each individual **item in the list** as selectable.

**Why:**

- Screen readers announce each option properly.
- Combined with `aria-selected`, it indicates which item is currently active or highlighted.

**Example:**

```html
<div role="option" aria-selected="true">Apple Pie</div>
<div role="option" aria-selected="false">Banana Bread</div>
```

## 7. `aria-selected`

**What:**

- Indicates whether an option is **currently selected or highlighted**.

**Why:**

- Provides feedback to the user navigating with the keyboard.
- Ensures the screen reader knows which item is active.

**Example:**

```html
<div role="option" aria-selected="true">Apple Pie</div>
<div role="option" aria-selected="false">Banana Bread</div>
```

## ✅ Summary of ARIA for Autocomplete

| ARIA Attribute          | Purpose / Why                             |
| ----------------------- | ----------------------------------------- |
| `role="combobox"`       | Marks input as searchable/selectable      |
| `aria-expanded`         | Communicates if the dropdown is open      |
| `aria-controls`         | Links input to the results container      |
| `aria-activedescendant` | Highlights currently active option        |
| `role="listbox"`        | Marks container as selectable list        |
| `role="option"`         | Marks each item as selectable             |
| `aria-selected`         | Indicates which option is active/selected |
