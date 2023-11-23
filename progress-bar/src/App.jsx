import { useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar.jsx";
import { useEffect } from "react";
function App() {
  const [value, setValue] = useState(0); // to change the percentage value

  useEffect(() => {
    const interval = setInterval(() => {
      // setValue(value + 1);
      // we can't do the above as setInterval runs after the very end of our function so it doesn't have the context of the value
      setValue((value) => value + 1);
    }, 100);

    if (value > 100) {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar value={value} />
    </div>
  );
}

export default App;
