import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [selectedStarCount, setSelectedStarCount] = useState(0);
  const [selectedHoverStarCount, setSelectedHoverStarCount] = useState(0);

  return (
    <div className="app">
      Star Rating
      <div className="stars">
        {/* Taking an array of size five and looping through it */}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span
              className={`${selectedStarCount > index ? "selected" : ""} ${
                selectedHoverStarCount > index ? "selected" : ""
              }`}
              onMouseOver={() => setSelectedHoverStarCount(index + 1)}
              onMouseOut={() => setSelectedHoverStarCount(0)}
              onClick={() => setSelectedStarCount(index + 1)}
              key={index}
            >
              &#9733;
            </span>
          ))}
      </div>
      <p>Rating Count : {selectedStarCount}</p>
      <p>Hover Rating Count : {selectedHoverStarCount}</p>
    </div>
  );
}

export default App;
