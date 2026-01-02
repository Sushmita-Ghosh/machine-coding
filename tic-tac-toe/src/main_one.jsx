/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px",
  color: "black",
};

// const winnerSquareStyle = {
//   ...squareStyle,
//   borderTop: "1px solid black",
//   position: "absolute",
// };

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({
  index,
  currentPlayer,
  setCurrentPlayer,
  cells,
  setCells,
  winner,
  setWinner,
}) {
  // defining all possible winning combos
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // row winning possibility
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // column  winning possibility
    [0, 4, 8],
    [2, 4, 6], // diagonal winning possibility
  ];

  const checkWinner = (newCell) => {
    console.log("Inside");
    console.log(cells);
    console.log(newCell);
    for (let combo of combos) {
      const [a, b, c] = combo;

      // console.log(a, b, c, newCell[a], newCell[b], newCell[c]);

      // console.log(
      //   newCell[a] === newCell[b] &&
      //     newCell[b] === newCell[c] &&
      //     newCell[a] === newCell[c] &&
      //     newCell[a] !== ""
      // );

      // console.log(
      //   newCell[a] === newCell[b] &&
      //     newCell[b] === newCell[c] &&
      //     newCell[a] === newCell[c]
      // );

      // console.log(newCell[a]);

      if (
        newCell[a] === newCell[b] &&
        newCell[b] === newCell[c] &&
        newCell[a] === newCell[c] &&
        newCell[a] !== ""
      ) {
        setWinner(newCell[a]);
        // console.log("Hi");
        // console.log(newCell[a]);
        return;
      }
    }
  };

  // do x and o based on click on specific cell
  const handleClick = () => {
    //

    if (cells[index] === "") {
      const newCell = [...cells];
      newCell[index] = currentPlayer;
      setCells(newCell);

      console.log("After Change");
      console.log(cells);

      if (currentPlayer === "X") {
        setCurrentPlayer("O");
      } else {
        setCurrentPlayer("X");
      }

      // check winner after each strike
      checkWinner(newCell);
    }
  };

  return (
    <div
      className="square"
      // style={winner !== "None" ? winnerSquareStyle : squareStyle}
      style={squareStyle}
      onClick={handleClick}
    >
      {cells[index]}
    </div>
  );
}

function Board() {
  // current player

  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("None");
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const resetHandler = () => {
    setCells(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("None");
  };

  const drawHandler = () => {
    if (winner === "None") {
      let drawInd = true;
      for (let cell of cells) {
        if (cell === "") {
          drawInd = false;
          break;
        }
      }
      if (drawInd === true) {
        setWinner("Draw");
      }
    }

    return winner;
  };
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{currentPlayer}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{drawHandler()}</span>
      </div>
      <button style={buttonStyle} onClick={resetHandler}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square
            index={0}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={1}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={2}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            index={3}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={4}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={5}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square
            index={6}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={7}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
          <Square
            index={8}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            cells={cells}
            setCells={setCells}
            winner={winner}
            setWinner={setWinner}
          />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
