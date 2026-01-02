import useTicTacToe from "../../hooks/useTicTacToe";
import "./styles.css";

const TicTacToe = () => {
  const { resetGame, getStatusMessage, handleClick, board, winnerInfo } =
    useTicTacToe();
  /** Helper to add line classes based on winning cells */
  const getLineStyle = (winnerInfo) => {
    const { winningCells } = winnerInfo;
    if (!winningCells.length) return {};

    const [a, , c] = winningCells;

    if (a + 1 === winningCells[1] && winningCells[1] + 1 === c) {
      // Horizontal
      const row = Math.floor(a / 3);
      return {
        top: `calc(${row * 100}px + 50px)`,
        width: "100%",
        height: "5px",
      };
    }
    if (a + 3 === winningCells[1] && winningCells[1] + 3 === c) {
      // Vertical
      const col = a % 3;
      return {
        left: `calc(${col * 100}px + 50px)`,
        width: "5px",
        height: "100%",
      };
    }
    if (a === 0 && c === 8)
      return {
        transform: "rotate(45deg)",
        width: "5px",
        height: "100%",
        top: 0,
        left: "50%",
      };
    if (a === 2 && c === 6)
      return {
        transform: "rotate(-45deg)",
        width: "5px",
        height: "100%",
        top: 0,
        left: "50%",
      };

    return {};
  };

  return (
    <div className="game">
      <h1>TIC TAC TOE</h1>
      <div className="status">
        <p children="statusmessage">{getStatusMessage()}</p>
        <button className="reset-button" onClick={resetGame}>
          Reset
        </button>
      </div>
      <div className="tic-tac-toe">
        {board.map((b, i) => {
          return (
            <button
              className={`cell ${b !== null && "disabled"}`}
              onClick={() => handleClick(i)}
              /** if there is a value in the cell already , disable it */
              style={{
                color: b == "X" ? "sandybrown" : "salmon",
              }}
            >
              {b}
            </button>
          );
        })}

        {/* /**The winning line */}
        {winnerInfo.winningCells.length > 0 && (
          <div className="winning-line" style={getLineStyle(winnerInfo)}></div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
