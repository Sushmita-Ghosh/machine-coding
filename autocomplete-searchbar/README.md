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
