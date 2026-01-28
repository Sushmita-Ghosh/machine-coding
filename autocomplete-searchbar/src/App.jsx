import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /**ENHANCEMENT 4: On KeyUp & KeyDown & hover Populate the input in the bar */
  /**Stores which item is currently highlighted, for both keyboard and hover. -1 means no item selected. */
  const [activeIndex, setActiveIndex] = useState(-1);

  /** ENHANCEMENT 3: CACHE THE RESULTS - why is this necessary?
   * Even if you debounce the results, still if you backspace (it will keep calling the api - which is not required at all) - So essentially another imp enhancement is - "CACHE THE RESULTS"
   * If you have already fetched results for the input no need to to again
   *
   * In the hash we are storing
   *
   * {
   *  [input] : []
   * }
   * 
   * cacheRef.current = {
  "apple": [{id:1,name:"Apple Pie"}, ...],
  "banana": [{id:2,name:"Banana Bread"}]
};
   */

  /**
   * hash = {
  ...hash,
  [input]: jsonData?.recipes,
};
This looks correct in normal JS, but in React: hash is not state; React throws it away on the next render
   */
  const cacheRef = useRef({});

  const handlefetchData = async () => {
    if (cacheRef.current[input]) {
      console.log("FETCH FROM HASH", cacheRef.current[input]);
      /** setResults to the cache & return*/
      setResults(cacheRef.current[input]);
      return;
    }
    const resultPromise = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const jsonData = await resultPromise.json();
    console.log("API CALLED", input);

    /** If not present , we need to add to hash */

    // console.log(hash);
    // hash = {
    //   ...hash,
    //   [input]: jsonData?.recipes,
    // };

    /** SET THE VALUE IN CACHE ,
     * we don't need to mutate here:
     * Think of useRef like a plain JS variable that survives renders. Think of useState like React-managed immutable data.
     */
    cacheRef.current[input] = jsonData?.recipes;
    // console.log("CACHE", cacheRef.current);
    setResults(jsonData?.recipes);
  };

  // Enhancement 2:  Debouncing perf Optimization
  useEffect(() => {
    const timer = setTimeout(() => {
      handlefetchData();
    }, 500);

    /** Here return is extremely import - we need to cancel if any previously running timeouts are running */
    /**
     * Without the return cleanup:
     * Every keystroke schedules a timeout; All timeouts eventually fire; You get multiple API calls ❌
     * With the cleanup: Old timers are cleared; Only the latest timer runs ✅
     */

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const handleChangeSearchBar = (e) => {
    setInput(e.target.value);
    setActiveIndex(-1); // reset selection when typing
  };

  /**
   *
   * ArrowDown
   *
   * Moves activeIndex down in the results array (cannot exceed last index).
   * Updates input to the selected result’s name.
   * e.preventDefault() → stops cursor from moving in input.
   *
   * ArrowUp
   *
   * Moves activeIndex up (cannot go below 0).
   * Updates input to the selected result’s name.
   *
   * Enter
   * Selects the currently highlighted result.
   * Closes results dropdown.
   *
   * Escape
   * Closes results dropdown without selecting anything.} e
   *
   */
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      /**Step by step
       * prev -> This is the current activeIndex (the currently highlighted item in the list).
       * results.length - 1 -> The last valid index in your results array.
       *
       * For example, if you have 5 results: indices are 0, 1, 2, 3, 4 → last index = 4.
       * prev < results.length - 1 ->  Checks: Are we currently before the last item?  If yes → it’s safe to move down.
       *
       * prev < results.length - 1 ? prev + 1 : prev
       * If prev is less than the last index → move down → prev + 1
       * If prev is already at the last item → stay there → prev
       *
       */

      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex = prev < results.length - 1 ? prev + 1 : prev;
        setInput(results[nextIndex].name);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      /**
       * prev > 0 ? prev - 1 : 0
       * If prev > 0 → move up one item → prev - 1
       * If prev === 0 → already at the top → stay at 0
       */
      setActiveIndex((prev) => {
        const nextIndex = prev > 0 ? prev - 1 : 0;
        setInput(results[nextIndex].name);
        return nextIndex;
      });
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      setShowResults(false);
      setInput(results[activeIndex].name);
    }

    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  return (
    <div className="app">
      <h1>Autocomplete SearchBar</h1>
      <div>
        {/* Enhancement 1: On click Inside the container show the dialog and on click of outside hide */}
        <input
          type="text"
          className="search-bar"
          value={input}
          onChange={(e) => handleChangeSearchBar(e)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={() => {
            setShowResults(false);
          }}
        />
      </div>

      {/* Results Container */}

      {showResults && results && (
        <div className="results-container">
          {results.map((result) => (
            <div
              className="result"
              key={result.id}
              // onMouseEnter → updates activeIndex and input when hovered
              // onMouseDown → selects item on click (using onMouseDown instead of onClick to avoid blur issues)
              onMouseEnter={() => {
                setActiveIndex(index);
                setInput(result.name);
              }}
              onMouseDown={() => {
                setInput(result.name);
                setShowResults(false);
              }}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
