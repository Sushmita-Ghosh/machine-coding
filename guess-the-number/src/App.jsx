import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [guessNumber, setGuessNumber] = useState(
    Math.floor(Math.random() * 100)
  );
  const [gameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState([]);
  const [guessMessage, setGuessMessage] = useState("");

  console.log(guesses, guessNumber);

  const handleClick = () => {
    if (gameOver) return;

    const n = Number(inputNumber);

    if (n > 100 || n < 1) {
      setDisplayMessage("Please Enter a Valid number between 1 to 100");
      return;
    }

    console.log(n);
    // if number already present
    if (guesses.indexOf(n) === -1) {
      setGuesses([...guesses, n]);
      setGuessMessage("");
    } else {
      setGuessMessage("Hey!😊 Try to guess a different Number");
    }

    if (n < guessNumber) {
      setDisplayMessage("Your number is too low");
    } else if (n > guessNumber) {
      setDisplayMessage("Your number is too high ");
    } else {
      setDisplayMessage("Congratulation!🍀 You have found your match");
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver)
      setDisplayMessage(
        `You have completed the game in ${guesses.length} guesses`
      );
  }, [gameOver]);

  return (
    <div className="app">
      <h1>Guess The Number</h1>
      <div className="container">
        <p>Guess a number from 1 to 100</p>
        <p>{displayMessage}</p>
        <div className="input-div">
          <input
            type="text"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button onClick={handleClick}>Check</button>
        </div>

        <div className="result-div">
          <p>Your Guesses:</p>
          {guessMessage && <h2>{guessMessage}</h2>}
          {guesses && guesses.map((guess) => `${guess}, `)}
        </div>
      </div>
    </div>
  );
}

export default App;
