import { useState } from "react";
import styles from "./App.module.scss";

function App() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  return (
    <main className={styles.main}>
      <h1>Counter</h1>
      <h2>{count}</h2>

      <section>
        <button
          aria-label="Decrement"
          onClick={() => setCount(count - Number(increment))}
        >
          -
        </button>
        <button
          aria-label="Increment"
          onClick={() => setCount(count + Number(increment))}
        >
          +
        </button>
      </section>

      <section>
        <label htmlFor="step">Increment/Decrement by</label>
        <input
          type="number"
          onChange={(e) => setIncrement(e.target.value)}
          value={increment}
        />
      </section>

      <section>
        <button
          onClick={() => {
            setCount(0);
            setIncrement(1);
          }}
        >
          Reset
        </button>
      </section>
    </main>
  );
}

export default App;
