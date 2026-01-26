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
