import { useState } from "react";

const INITIALBOARD = Array(9).fill(null);
const useTicTacToe = () => {
  const [board, setBoard] = useState(INITIALBOARD);
  /** to set the turn */
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({
    winner: null,
    winningCells: [],
  });

  const WINNING_PATTERNS = [
    /**horizontal */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    /** vertical */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    /** cross */
    [0, 4, 8],
    [2, 4, 6],
  ];

  /** To calculate who's the winner */
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];

      /** check if either in the position of the current board all the values are either X or O */
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        // return currentBoard[a];
        return { winner: currentBoard[a], winningCells: [a, b, c] };
      }
    }

    /** If none of them match return null - as no winner */
    // return null;
    return { winner: null, winningCells: [] };
  };

  /** to reset the game */
  //   const resetGame = () => {
  //     setBoard(INITIALBOARD);
  //     setIsXNext(true);
  //   };
  const resetGame = () => {
    setBoard(INITIALBOARD);
    setIsXNext(true);
    setWinnerInfo({ winner: null, winningCells: [] });
  };

  /** for getting the message who win */
  //   const getStatusMessage = () => {
  //     const winner = calculateWinner(board);
  //     if (winner) {
  //       return `Player ${winner} wins!!!`;
  //     }
  //     if (!board.includes(null)) return `Its a draw!`;
  //     return `Player ${isXNext ? "X" : "O"} turn`;
  //   };

  const getStatusMessage = () => {
    if (winnerInfo.winner) return `Player ${winnerInfo.winner} wins!!!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  //   /** click on the x & o boxes - needs to know which index */
  //   const handleClick = (index) => {
  //     /** check for winner - using the old board - since we modify it later so we need to pass it*/
  //     const winner = calculateWinner(board);

  //     if (winner) return;

  //     /** else modify the index with an X or O */
  //     const newBoard = [...board];
  //     newBoard[index] = isXNext ? "X" : "O";
  //     setBoard(newBoard);
  //     setIsXNext(!isXNext);
  //   };

  // to draw the line
  const handleClick = (index) => {
    if (winnerInfo.winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    setWinnerInfo(result);

    setIsXNext(!isXNext);
  };

  return { winnerInfo, resetGame, getStatusMessage, handleClick, board };
};

export default useTicTacToe;
