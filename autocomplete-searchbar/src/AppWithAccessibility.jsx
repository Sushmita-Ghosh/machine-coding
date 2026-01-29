import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const cacheRef = useRef({});

  const handlefetchData = async () => {
    if (cacheRef.current[input]) {
      setResults(cacheRef.current[input]);
      return;
    }
    const resultPromise = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const jsonData = await resultPromise.json();
    cacheRef.current[input] = jsonData?.recipes;
    setResults(jsonData?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handlefetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const handleChangeSearchBar = (e) => {
    setInput(e.target.value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex = prev < results.length - 1 ? prev + 1 : prev;
        setInput(results[nextIndex].name);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
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
        {/* 
        Add ARIA roles
        role="combobox" → on the input
        aria-expanded → reflects if the dropdown is visible
        aria-activedescendant → points to the currently highlighted item
        role="listbox" → on the results container
        role="option" → on each result
        */}
        <input
          type="text"
          role="combobox"
          aria-expanded={showResults}
          aria-controls="results-list"
          aria-activedescendant={
            activeIndex >= 0 ? `result-${activeIndex}` : undefined
          }
          value={input}
          onChange={handleChangeSearchBar}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>

      {showResults && results && (
        <div className="results-container" role="listbox" id="results-list">
          {results.map((result) => (
            <div
              key={result.id}
              id={`result-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={`result ${index === activeIndex ? "active" : ""}`}
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
