import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /** ENHANCEMENT 3: CACHE THE RESULTS - why is this necessary?
   * Even if you debounce the results, still if you backspace (it will keep calling the api - which is not required at all) - So essentially another imp enhancement is - "CACHE THE RESULTS"
   * If you have already fetched results for the input no need to to again
   *
   * In the hash we are storing
   *
   * {
   *  [input] : []
   * }
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
